/*global angular*/

angular.module('cplantApp').controller('logInPageCtrl', function ($scope, $state, AnswersService, UtilityService) {
    'use strict';
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    $scope.logIn = function () {
        $state.go(UtilityService.MAIN_PAGE, {});
    };
});
