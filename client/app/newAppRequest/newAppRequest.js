/*global angular*/

angular.module('cplantApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('newAppRequest', {
        url: '',
        templateUrl: 'app/newAppRequest/newAppRequest.html',
        controller: 'newAppRequestCtrl'
    });
});
