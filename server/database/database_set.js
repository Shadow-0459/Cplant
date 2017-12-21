var newAppRequest = require('./models/newAppRequest_data');
var bugRequest = require('./models/bugRequest_data');
var featureRequest = require('./models/featureRequest_data');
var multer = require('multer');

//get requests
function getNewAppRequests(res) {
    'use strict';
    newAppRequest.find(function (err, newAppRequests) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(newAppRequests); // return all newAppRequests in JSON format
    });
}
function getBugRequests(res) {
    'use strict';
    bugRequest.find(function (err, bugRequests) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(bugRequests); // return all bugRequests in JSON format
    });
}
function getFeatureRequests(res) {
    'use strict';
    featureRequest.find(function (err, featureRequests) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(featureRequests); // return all featureRequests in JSON format
    });
}
module.exports = function (app) {
    'use strict';

    //newAppRequest
    app.get('/labs/cplants/getNewAppRequests', function(req,res){
        // use mongoose to get all newAppRequests in the database
        getNewAppRequests(res);
    });
    app.post('/labs/cplant/newAppRequest', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        newAppRequest.create({
            appName: req.body.appName,
            appDescription: req.body.appDescription,
            product: req.body.product,
            belongTo: req.body.belongTo,
            toolUser: req.body.toolUser,
            userToolHave: req.body.userToolHave,
            caseOpenDay: req.body.caseOpenDay,
            toolHelpDecrease: req.body.toolHelpDecrease,
            toolHelpShorten : req.body.toolHelpShorten,
            toolExisting: req.body.toolExisting,
            kbaseSolutions: req.body.kbaseSolutions,
            keyRequirements: req.body.keyRequirements,
            ListScenarios: req.body.ListScenarios,
            specific: req.body.specific,
            primaryContact: req.body.primaryContact,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
            // get and return all the newAppRequests after you create another
            getNewAppRequests(res);
        });
    });
    // delete a Request
    app.delete('/labs/cplant/newAppRequestDelete/:Request_id', function (req, res) {
        newAppRequest.remove({
            _id: req.params.Request_id
        }, function (err, cplant) {
            if (err)
                res.send(err);

            getNewAppRequests(res);
        });
    });
    //update status
    app.put('/labs/cplant/changeNewAppRequestStatus/:Request_id', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        newAppRequest.update({
            _id: req.params.Request_id,
        },{
            requestStatus: req.body.requestStatus,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
        });
    });

    //bugRequest
    app.get('/labs/cplants/getBugRequests', function(req,res){
        // use mongoose to get all bugRequest in the database
        getBugRequests(res);
    });
    //bugRequest upload file
    var bugStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './server/database/bugRequestFiles');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });
    var uploadBugRequestFile = multer({ //multer settings
        storage: bugStorage
    }).single('file');
    app.post('/labs/cplant/uploadBugRequestFile', function(req, res) {
        uploadBugRequestFile(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });

    //BugRequest create
     app.post('/labs/cplant/bugRequest', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        bugRequest.create({
            apps: req.body.apps,
            bugSummary: req.body.bugSummary,
            bugDescription: req.body.bugDescription,
            fileName: req.body.fileName,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
            // get and return all the bugRequests after you create another
            getBugRequests(res);
        });
    });
    // delete a Request
    app.delete('/labs/cplant/bugRequestDelete/:Request_id', function (req, res) {
        bugRequest.remove({
            _id: req.params.Request_id
        }, function (err, cplant) {
            if (err)
                res.send(err);

            getBugRequests(res);
        });
    });
    //update status
    app.put('/labs/cplant/changeBugRequestStatus/:Request_id', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        bugRequest.update({
            _id: req.params.Request_id,
        },{
            requestStatus: req.body.requestStatus,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
        });
    });
    //add fileName
    app.put('/labs/cplant/addBugRequestFileName/:Request_id', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        bugRequest.update({
            _id: req.params.Request_id,
        },{
            fileName: req.body.fileName,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
        });
    });
    //download attachment
    app.get('/labs/cplants/bugRequestDownload/:fileName',function(req, res){
        var fileName = req.params.fileName;
        res.set("Content-Type", "application/x-png");
        res.set("Content-Disposition", 'attachment; filename=yeoman.png');
        res.download(__dirname + '/bugRequestFiles/' + fileName, fileName)
    });




    //featureRequest
    app.get('/labs/cplants/getFeatureRequests', function(req,res){
        // use mongoose to get all featureRequest in the database
        getFeatureRequests(res);
    });

    //featureRequest upload file
    var featureStorage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './server/database/featureRequestFiles');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.originalname);
        }
    });
    var uploadFeatureRequestFile = multer({ //multer settings
        storage: featureStorage
    }).single('file');
    app.post('/labs/cplant/uploadFeatureRequestFile', function(req, res) {
        uploadFeatureRequestFile(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });

    //featureRequest create
    app.post('/labs/cplant/featureRequest', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        featureRequest.create({
            apps: req.body.apps,
            featureSubject: req.body.featureSubject,
            featurePriority: req.body.featurePriority,
            featureAssignedTo: req.body.featureAssignedTo,
            featureCategory: req.body.featureCategory,
            featureDescription: req.body.featureDescription,
            fileName: req.body.fileName,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
            // get and return all the featureRequests after you create another
            getFeatureRequests(res);
        });
    });
    // delete a Request
    app.delete('/labs/cplant/featureRequestDelete/:Request_id', function (req, res) {
        featureRequest.remove({
            _id: req.params.Request_id
        }, function (err, cplant) {
            if (err)
                res.send(err);

            getFeatureRequests(res);
        });
    });
    //update status
    app.put('/labs/cplant/changeFeatureRequestStatus/:Request_id', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        featureRequest.update({
            _id: req.params.Request_id,
        },{
            requestStatus: req.body.requestStatus,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
        });
    });
    //add fileName
    app.put('/labs/cplant/addFeatureRequestFileName/:Request_id', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        featureRequest.update({
            _id: req.params.Request_id,
        },{
            fileName: req.body.fileName,
            done: false
        }, function (err, cplant) {
            if (err){
                console.log("eee" + err);
                res.send(err);
            }
        });
    });
    //download attachment
    app.get('/labs/cplants/featureRequestDownload/:fileName',function(req, res){
        var fileName = req.params.fileName;
        res.set("Content-Type", "application/x-png");
        res.set("Content-Disposition", 'attachment; filename=yeoman.png');
        res.download(__dirname + '/featureRequestFiles/' + fileName, fileName)
    });
};
