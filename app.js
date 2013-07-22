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
    app.set('PORT', process.env.PORT || 3000);
    app.set('MONGODB_URI', 'mongodb://localhost/persons');

});

/**
 * MongoDB connection
 */
var db = mongoose.createConnection(app.get('MONGODB_URI'));

db.on('connected', function () {
    console.log('Aplikasi terhubung dengan database.');

});

db.on('error', function (err) {
    console.error.bind(console, 'Connection error!');
});

db.on('close', function () {
    console.log('Koneksi ke database ditutup.');
});

// Schema
var PersonsSchema = new mongoose.Schema({
        name: 'string',
        username: 'string',
        website: 'string',
        createdAt: 'date'
    }),

    Persons = db.model('Persons', PersonsSchema);

// Routes
app.get("/", function (req, res) {
    res.render('index',{
        title:"Koneksi Node & MongoDB",
        github:"https://github.com/junwatu/koneksi-node-mongodb"
    });
});

app.get("/persons", function (req, res) {

    // Find All
    Persons.find(function (err, persons) {
        if (err) res.send(err)

        res.set('Content-Type', 'application/json');
        res.send(persons);
    })
});


app.post("/persons", function(req, res){
    /**
     * Get data from post
     * @type {Persons}
     */
    var person = new Persons({
        name: 'Equan Pr.',
        username: "equan_pr",
        website: 'http://www.junwatu.com',
        createdAt: new Date()
    });

    person.save(function (err, person) {
        if (err) res.send(err)
        console.log('Save Data: ' + person);
    })


    res.send(req.body.name + " "+ req.body.website);
});

app.get('/persons/:username', function(req, res){
    res.send(req.params.username);
});

app.put('/persons/:username', function(req, res){

});

app.delete('/persons/:username', function(req, res){

});

app.listen(app.get('PORT'));
console.log("Server Port: " + app.get('PORT'));