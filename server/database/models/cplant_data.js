var mongoose = require('mongoose');
module.exports = mongoose.model('Cplant', {
    appName: {
        type: String,
        default: ''
    },
    appDescription: {
        type: String,
        default: ''
    },
    product: {
        type: String,
        product: ''
    },
    belongTo: {
        type: String,
        product: ''
    },
    toolUser: {
        type: String,
        product: ''
    },
    userToolHave: {
        type: String,
        product: ''
    },
    caseOpenDay: {
        type: String,
        product: ''
    },
    toolHelpDecrease: {
        type: String,
        product: ''
    },
    toolHelpShorten: {
        type: String,
        product: ''
    },
    toolExisting: {
        type: String,
        product: ''
    },
    kbaseSolutions: {
        type: String,
        product: ''
    },
    keyRequirements: {
        type: String,
        product: ''
    },
    ListScenarios: {
        type: String,
        product: ''
    },
    specific: {
        type: String,
        product: ''
    },
    primaryContact: {
        type: String,
        product: ''
    }
});
