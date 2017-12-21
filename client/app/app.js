/*global angular*/

angular.module('cplantApp', [
    'duScroll',
    'ngFileUpload',
    'ngMaterial',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'pascalprecht.translate'
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
