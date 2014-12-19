
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
                var direction = { name: "", routeid: req.query.id };
                // We'll use the unique header class as a starting point.
                $('ul li').each(function () {
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    var data = $(this);
                    // In examining the DOM we notice that the title rests within the first child element of the header tag. 
                    // Once we have our title, we'll store it to the our json object.
                    direction.name = trim(data.find('a').text());
                    result.push({ name: direction.name, routeid: req.query.id });
                });
                res.json(result)
            }
        });

    });

    //Route Direction Details : http://mybusnow.njtransit.com/bustime/wireless/html/selectstop.jsp?route=22&direction=North+Bergen
    app.get('/api/route/stops', function (req, res) {
        var result = new Array();
        var direction = req.query.direction.replace(' ', '+');
        var url = 'http://mybusnow.njtransit.com/bustime/wireless/html/selectstop.jsp?route=' + req.query.route + '&direction=' + direction;
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var stop = { name: "", id: 0, showall: true };
                $('ul li').each(function () {
                    var data = $(this);
                    result.push({ name: trim(data.find('a').text()), id: trim(getParameterByName(data.find('a').attr('href'), 'id')), routenumber: req.query.route, direction: direction, showall: true });
                });
                res.json(result)
            }
        });
    });

    //Route Direction Stop Details : http://mybusnow.njtransit.com/bustime/wireless/html/eta.jsp?route=22&direction=North+Bergen&id=21696&showAllBusses=on
    app.get('/api/route/direction/stop/detail', function (req, res) {
        var result = new Array(); var message = '';
        var direction = req.query.direction.replace(' ', '+');
        var url = 'http://mybusnow.njtransit.com/bustime/wireless/html/eta.jsp?route=' + req.query.route + '&direction=' + direction + '&id=' + req.query.stopid + '&showAllBusses=on';
        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var time = '', route = '', timeindex = 0;
                $("hr").prevAll("hr~*").each(function (i) {
                    var data = $(this);
                    if (data[0].name = 'font' && data.attr('size') == '+1') {
                        if (time == '') {
                            time = data.text();
                            timeindex = i;
                        }
                        if (time != '' && route == '' && i > timeindex) {
                            route = data.text()
                            result.push({ time: time, route: route, busnumber: '', routename: '' })
                            time = '', route = '';
                        }
                    }
                    //result.push({ name: trim(data.find('a').text()), id: trim(getParameterByName(data.find('a').attr('href'), 'route')), showall: true });
                });
                if (result.length == 0) {
                    message = 'No service is scheduled for this stop at this time.';
                }
                else {
                    message = 'success';
                }
                res.json({ message: message, result: result })
            }
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

    function getParameterByName(url, name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
        return results == null ? "" : decodeURIComponent(results[1]);
    }
};