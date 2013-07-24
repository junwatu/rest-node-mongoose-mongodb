/*
 * Koneksi Nodejs dengan MongoDB menggunakan Mongoose
 *
 * Author By Equan Pr.
 * www.junwatu.com
 *
 * License :  Whatever you want! :D
 */

var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
    path = require('path'),
    engines = require('consolidate');

app.configure(function () {
    app.use(express.logger());

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname+'/public'));

    app.engine('html', engines.handlebars);

    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    app.set('PORT', process.env.PORT || 3300);
    app.set('MONGODB_URI', 'mongodb://localhost/persons');

});

/**
 * MongoDB connection
 */
var db = mongoose.createConnection(app.get('MONGODB_URI'));

db.on('connected', function () {
    console.log('Connected to MongoDB.');

});

db.on('error', function (err) {
    console.error.bind(console, 'Connection to MongoDB error!.');
});

db.on('close', function () {
    console.log('Connection to MongoDB closed.');
});

// Schema
var PersonsSchema = new mongoose.Schema({
        name: 'string',
        username: 'string',
        website: 'string',
        createdAt: 'date',
        updatedAt: 'date'
    }),

    Persons = db.model('Persons', PersonsSchema);

// Routes
app.get("/", function (req, res) {
    res.json({
        info: 'Persons REST API'
    });
});

// GET /persons
app.get("/persons", function (req, res) {
    // Find All
    Persons.find(function (err, persons) {
        if (err) res.json({error: err})

        if(persons)
            res.json({persons: persons});
    })
});

// POST /persons
app.post("/persons", function(req, res){
    /**
     * Get data from post
     * @type {Persons}
     */
    var person = new Persons({
        name: req.body.name,
        username: req.body.username,
        website: req.body.website,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    person.save(function (err, person) {
        if (err) {
            res.send({error:err});
        }else {
            console.log('Save data: ' + person);
            res.json({message: ' save ok'});
        }
    })
});

// GET /persons/:username
app.get('/persons/:username', function(req, res){
    var param_username = req.params.username;

    Persons.find({username:param_username}, function(err, person){
        if(err) {
            res.json({
                data:"Error finding person."
            });
        }else {
            res.json({
                person: person
            });
        }
    })
});

// PUT /persons/:username
app.put('/persons/:username', function(req, res){
    var query = {username: req.params.username},
        data_update = {
            name : req.body.name,
            username: req.params.username,
            website: req.body.website,
            updatedAt: new Date()
        }

    Persons.update(query, data_update, {multi:false}, function(err, numberAffected, rawResponse ){
        if(err) {
            res.json({
                error:err
            })
        }else {
            res.json({
                numberAffected:numberAffected,
                rawResponse: rawResponse
            });
        }
    });

});

// DELETE /persons/:username

app.delete('/persons/:username', function(req, res){
    var param_username_del = req.params.username;

    Persons.remove({username:param_username_del}, function(err){
        if(err){ res.json({
            error:err
        })
        }else {
            res.json({message: "delete ok"});
        }
    });
});


app.listen(app.get('PORT'));
console.log("Server Port: " + app.get('PORT'));