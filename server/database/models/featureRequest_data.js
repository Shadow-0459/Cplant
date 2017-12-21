var mongoose = require('mongoose');
module.exports = mongoose.model('featureRequests', {
    apps: {
        type: String,
        default: ''
    },
    featureSubject: {
        type: String,
        default: ''
    },
    featureDescription: {
        type: String,
        default: ''
    },
    requester: {
        type: String,
        default: 'Beckham'
    },
    requestStatus: {
        type: String,
        default: 'accept'
    },
    showDetails: {
        type: Boolean,
        default: false
    },
    fileName: {
        type: String,
        default: ''
    }
});
