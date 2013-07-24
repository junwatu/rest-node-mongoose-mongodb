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
    res.setHeader('content-type', 'text/application-json');
    res.json({
        info: 'Persons REST API'
    });
});

app.listen(app.get('PORT'));
console.log("Server Port: " + app.get('PORT'));