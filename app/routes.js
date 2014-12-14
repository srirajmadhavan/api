var Nerd = require('./models/nerd');
var Route = require('./models/route');
var User = require('./models/user');
var request = require('request');
var cheerio = require('cheerio');
var trim = require('trim');

module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================
    // route to handle all angular requests

    // Get Route List from Mongo : http://mybusnow.njtransit.com/bustime/wireless/html/home.jsp
    app.get('/api/route/list', function (req, res) {
        var result = new Array();
        Route.find({}).exec(function (err, collection) {
            result = collection;
            if (result.length === 0) {
                var url = 'http://mybusnow.njtransit.com/bustime/wireless/html/home.jsp';
                request(url, function (error, response, html) {
                    if (!error) {
                        var $ = cheerio.load(html);
                        var json = { name: "", number: 0 };
                        $('ul li').each(function () {
                            var data = $(this);
                            json.name = trim(data.find('a').text());
                            json.number = data.find('a').attr('href').replace('selectdirection.jsp?route=', '');
                            Route.create({ name: json.name, number: json.number });
                            result.push({ name: json.name, number: json.number });
                        });
                        res.json(result); 
                    }
                });
            }
            else
                res.json(result); 
        });
    });

    // Search by stop ID
    app.get('/api/stop/search', function (req, res) {
        var url = 'http://mybusnow.njtransit.com/bustime/wireless/html/eta.jsp?id=' + req.query.id;
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var json = { title: "", release: "", rating: "" };
                // We'll use the unique header class as a starting point.
                $('.header').filter(function () {
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    var data = $(this);
                    // In examining the DOM we notice that the title rests within the first child element of the header tag. 
                    // Utilizing jQuery we can easily navigate and get the text by writing the following code:
                    title = data.children().first().text();
                    // Once we have our title, we'll store it to the our json object.
                    json.title = title;
                })
            }
        });
    });

    //Route Details :http://mybusnow.njtransit.com/bustime/wireless/html/selectdirection.jsp?route=22
    app.get('/api/route/detail', function (req, res) {
        var result = new Array();
        var url = 'http://mybusnow.njtransit.com/bustime/wireless/html/selectdirection.jsp?route=' + req.query.id;
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var direction = { name: "" };
                // We'll use the unique header class as a starting point.
                $('ul li').each(function () {
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    var data = $(this);
                    // In examining the DOM we notice that the title rests within the first child element of the header tag. 
                    // Once we have our title, we'll store it to the our json object.
                    direction.name = trim(data.find('a').text());
                    result.push({ name: direction.name });
                });
                res.json(result)
            }
        });

    });

    //Route Direction Details : http://mybusnow.njtransit.com/bustime/wireless/html/selectstop.jsp?route=22&direction=North+Bergen
    app.get('/api/route/direction', function (req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function (err, nerds) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    //Route Direction Stop Details : http://mybusnow.njtransit.com/bustime/wireless/html/eta.jsp?route=22&direction=North+Bergen&id=21696&showAllBusses=on
    app.get('/api/route/direction/stop', function (req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function (err, nerds) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    //Route Direction Stop Details : http://mybusnow.njtransit.com/bustime/wireless/html/eta.jsp?route=22&direction=North+Bergen&id=21696&showAllBusses=on
    app.get('/api/user/userfromemail', function (req, res) {
        // use mongoose to get all nerds in the database
        var query = User.where({ email: req.query.email });
        query.findOne(function (err, user) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            console.log(req.query.email + '  ' + req.query.name);
            if (user == null && req.query.email != "undefined" && req.query.name != "undefined") {
                User.create({ name: req.query.name, email: req.query.email });
            }
            console.log(user);
            res.json(user); // return all nerds in JSON format
        });
    });
};