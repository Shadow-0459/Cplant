/*global angular*/

angular.module('cplantApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('featureRequest', {
        url: '',
        templateUrl: 'app/featureRequest/featureRequest.html',
        controller: 'featureRequestCtrl'
    });
});
