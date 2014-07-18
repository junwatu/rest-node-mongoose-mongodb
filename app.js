/*
 * Koneksi Nodejs dengan MongoDB menggunakan Mongoose
 *
 * Author By Equan Pr.
 * http://equan.me
 *
 * License :  Whatever you want! :D
 */

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');


app.use(logger());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
})

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.engine('html', engines.handlebars);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.set('PORT', process.env.PORT || 5000);
app.set('MONGODB_URI', process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/persons');

var router = express.Router();

/**
 * MongoDB connection
 */
var db = mongoose.createConnection(app.get('MONGODB_URI'));

db.on('connected', function() {
    console.log('Connected to MongoDB.');

});

db.on('error', function(err) {
    console.error.bind(console, 'Connection to MongoDB error!.');
});

db.on('close', function() {
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
app.get("/", function(req, res) {
    res.render('index', {
        data: 'Silly RESTful sample app built with Node.js, Express, Mongoose and MongoDB. ' +
            'Maybe it\'s useful for beginners ;)'
    });
});

// GET /api/persons
router.get("/persons", function(req, res) {
    // Find All
    Persons.find(function(err, persons) {
        if (err) res.json({
            error: err
        })

        if (persons)
            res.json({
                persons: persons
            });
    })
});

// POST /api/persons
router.post("/persons", function(req, res) {
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

    person.save(function(err, person) {
        if (err) {
            res.send({
                error: err
            });
        } else {
            console.log('Save data: ' + person);
            res.json({
                message: ' save ok'
            });
        }
    })
});

// GET /api/persons/:username
router.get('/persons/:username', function(req, res) {
    var param_username = req.params.username;

    Persons.find({
        username: param_username
    }, function(err, person) {
        if (err) {
            res.json({
                data: "Error finding person."
            });
        } else {
            res.json({
                person: person
            });
        }
    })
});

// PUT /api/persons/:username
router.put('/persons/:username', function(req, res) {
    var query = {
            username: req.params.username
        },
        data_update = {
            name: req.body.name,
            username: req.params.username,
            website: req.body.website,
            updatedAt: new Date()
        }

    Persons.update(query, data_update, {
        multi: false
    }, function(err, numberAffected, rawResponse) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                numberAffected: numberAffected,
                rawResponse: rawResponse
            });
        }
    });

});

// DELETE /api/persons/:username
router.delete('/persons/:username', function(req, res) {
    var param_username_del = req.params.username;

    Persons.remove({
        username: param_username_del
    }, function(err) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: "delete ok"
            });
        }
    });
});

app.use('/api', router);

app.listen(app.get('PORT'));
console.log("Server Port: " + app.get('PORT'));
