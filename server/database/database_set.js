var cplant = require('./models/cplant_data');

function getCplants(res) {
    'use strict';
    cplant.find(function (err, cplants) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(cplants); // return all cplants in JSON format
    });
}
module.exports = function (app) {
    'use strict';
    // create cplant and send back all cplants after creation
    app.post('/labs/cplant', function (req, res) {
        // create a cpalnt, information comes from AJAX request from Angular
        cplant.create({
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
            // get and return all the cplants after you create another
            getCplants(res);
        });
    });
};
