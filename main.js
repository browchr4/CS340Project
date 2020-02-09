var express = require('express');
var os = require('os');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 44213);


//homepage
app.get('/', function (req, res) {
    res.render('home');
});



// GET Functions
//Creates new row in Flight, CrewList, TravelerList tables
app.get('/addFlight', function (req, res) {
    res.render('addFlight')
});

//Read data from Flight table with user-submitted parameters
app.get('/getFlightInfo', function (req, res) {
    res.render('getFlightInfo');
});

//Assigns traveler to TravelerList for a flight
app.get('/addTraveler', function (req, res) {
    res.render('addTraveler');
});

//Update some parameters of the flight (i.e. date, Crew, plane)
app.get('/updateFlight', function (req, res) {
    res.render('updateFlight');
});

//Delete row from TravelerList table
app.get('/removeTraveler', function (req, res) {
    res.render('removeTraveler');
});




// POST functions
app.post('/addFlight', function (req, res) {
    // SQL QUERY VALIDITY CHECK, SANITIZATION, AND SUBMISSION GOES HERE
    res.render('addFlight')
});
app.post('/getFlightInfo', function (req, res) {
    // SQL QUERY VALIDITY CHECK, SANITIZATION, AND SUBMISSION GOES HERE
    res.render('getFlightInfo')
});
app.post('/addTraveler', function (req, res) {
    // SQL QUERY VALIDITY CHECK, SANITIZATION, AND SUBMISSION GOES HERE
    res.render('addTraveler')
});
app.post('/updateFlight', function (req, res) {
    // SQL QUERY VALIDITY CHECK, SANITIZATION, AND SUBMISSION GOES HERE
    res.render('updateFlight')
});
app.post('/removeTraveler', function (req, res) {
    // SQL QUERY VALIDITY CHECK, SANITIZATION, AND SUBMISSION GOES HERE
    res.render('removeTraveler')
});



//404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

//500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});



app.listen(app.get('port'), function () {
    console.log('Express started on http://' + os.hostname() + ':' + app.get('port') + '; press Ctrl-C to terminate.');
});
