/*global angular*/

angular.module('cplantApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('bugRequest', {
        url: '',
        templateUrl: 'app/bugRequest/bugRequest.html',
        controller: 'bugRequestCtrl'
    });
});
