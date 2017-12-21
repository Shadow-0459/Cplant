var mongoose = require('mongoose');
module.exports = mongoose.model('newAppRequests', {
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
        default: ''
    },
    belongTo: {
        type: String,
        default: ''
    },
    toolUser: {
        type: String,
        default: ''
    },
    userToolHave: {
        type: String,
        default: ''
    },
    caseOpenDay: {
        type: String,
        default: ''
    },
    toolHelpDecrease: {
        type: String,
        default: ''
    },
    toolHelpShorten: {
        type: String,
        default: ''
    },
    toolExisting: {
        type: String,
        default: ''
    },
    kbaseSolutions: {
        type: String,
        default: ''
    },
    keyRequirements: {
        type: String,
        default: ''
    },
    ListScenarios: {
        type: String,
        default: ''
    },
    specific: {
        type: String,
        default: ''
    },
    primaryContact: {
        type: String,
        default: ''
    },
    requestStatus: {
        type: String,
        default: 'accept'
    },
    requester: {
        type: String,
        default: 'Beckham'
    },
    showDetails:{
        type: Boolean,
        default: false
    }
});
