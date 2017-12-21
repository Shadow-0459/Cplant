/*global angular*/

angular.module('cplantApp').controller('MainCtrl', function ($scope, $state, UtilityService, AnswersService) {
    'use strict';
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;

    $scope.stateGo = function () {
        if ($scope.answer.stateTo === 'Nominate a new proposal app') {
            $state.go(UtilityService.NEW_APP_REQUEST, {});
        }
        if ($scope.answer.stateTo === 'Open a bug for an existing app') {
            $state.go(UtilityService.BUG_REQUEST, {});
        }
        if ($scope.answer.stateTo === 'Open a feature request for an existing app') {
            $state.go(UtilityService.FEATURE_REQUEST, {});
        }
        if ($scope.answer.stateTo === 'Review nominations') {
            $state.go(UtilityService.REQUESTS_REVIEW, {});
        }
    };
});
