/*global angular*/

angular.module('cplantApp').config(function ($stateProvider) {
    'use strict';
    $stateProvider.state('logInPage', {
        url: '',
        templateUrl: 'app/logInPage/logInPage.html',
        controller: 'logInPageCtrl'
    });
});
