/*global angular*/

angular.module('cplantApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('requestsReview', {
        url: '',
        templateUrl: 'app/requestsReview/requestsReview.html',
        controller: 'requestsReviewCtrl'
    });
});
