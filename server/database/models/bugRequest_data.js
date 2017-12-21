var mongoose = require('mongoose');
module.exports = mongoose.model('bugRequests', {
    apps: {
        type: String,
        default: ''
    },
    bugSummary: {
        type: String,
        default: ''
    },
    bugDescription: {
        type: String,
        default: ''
    },
    requester: {
        type: String,
        default: 'Beckham'
    },
    showDetails: {
        type: Boolean,
        default: false
    },
    requestStatus: {
        type: String,
        default: 'accept'
    },
    fileName : {
        type: String,
        default: ''
    }
});
