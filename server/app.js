/*global require, process, console*/

var moment = require('moment');
var express = require('express');
var path = require('path');
var fs = require('fs');
var pkg = require('../package');
var appPath = '/labs/' + pkg.name + '/';
var port = process.env.PORT || 9000;
var ip = process.env.IP || 'localhost';
var publicDir = 'client';
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var database = require('../client/assets/database');    // load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect(database.localUrl);    // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)
app.use(express.static('./public'));    //set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(function (req, res, next) { //allow cross origin requests
    'use strict';
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "/labs/cplant");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var env = process.env.NODE_ENV || 'development';
if ('production' === env) {
    publicDir = 'public';
    ip = process.env.OPENSHIFT_LABSNODEJS_IP || ip;
    port = process.env.OPENSHIFT_LABSNODEJS_PORT || port;
    if (!process.env.OPENSHIFT_LABSNODEJS_IP) {
        publicDir = 'dist/public';
    }
} else {
    app.use(appPath, express.static(path.resolve('.tmp')));
}

app.use(appPath, express.static(path.resolve(publicDir)));

app.get('/', function (req, res) {
    'use strict';
    res.send(200);
});

app.get(appPath + '*', function (req, res) {
    'use strict';
    res.sendFile(path.resolve(publicDir + '/index.html'));
});

// route to serve /labs_key.txt
app.get('/labs_key.txt', function (req, res) {
    'use strict';
    res.sendfile(path.resolve(publicDir + '/labs_key.txt'));
});

//route database_set
require('./database/database_set.js')(app);

// Start server
server.listen(port, ip, function () {
    'use strict';
    console.log(moment().format() + ' Express server listening on %d, in %s mode', port, app.get('env'));
});
