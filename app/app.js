/*global angular*/

angular.module('cplantApp', [
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngMaterial'
]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}).config(function ($translateProvider) {
    'use strict';
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/languages/messages_',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);
});
