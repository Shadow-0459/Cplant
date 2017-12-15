/*global angular*/

angular.module('cplantApp').controller('MainCtrl', function ($scope, UtilityService, AnswersService, CreateCplantService, $mdSidenav, $mdUtil, $log, $timeout, $http) {
    'use strict';
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    $scope.createCplant = CreateCplantService;
    $scope.toggleLeft = buildToggler('left');
    $scope.lockLeft = true;
    $scope.ShowTextarea = function() {
        console.log($scope.answer.product);
    };
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug('toggle ' + navID + ' is done');
              });
          },300);
      return debounceFn;
    }
    // when submitting the add form, send the text to the node API
    $scope.createCplants = function() {
        if ($scope.answer.appName !== undefined) {
            if($scope.answer.product === 'Other-product') {
                $scope.answer.product = $scope.answer.productOther;
            }
            if($scope.answer.belongTo === 'Other-tool') {
                $scope.answer.belongTo = $scope.answer.belongToOther;
            }
            if($scope.answer.caseOpenDay === 'Other-case') {
                $scope.answer.caseOpenDay = $scope.answer.caseOpenDayOther;
            }
            if($scope.answer.userCustomers === true) {
                $scope.answer.toolUser = $scope.answer.toolUser + 'Customers' + ' | ';
            }
            if($scope.answer.userSDSCET === true) {
                $scope.answer.toolUser = $scope.answer.toolUser + 'Support Delivery / Strategic Customer Engagement teams' + ' | ' ;
            }
            if($scope.answer.userOther === true) {
                $scope.answer.toolUser = $scope.answer.toolUser + $scope.answer.userOtherContent;
            }
            $scope.createCplant.create($scope.answer)
    		// if successful creation, call our get function to get all the new todos
    		.then(function(data) {
    			$scope.answer = {}; // clear the form so our user is ready to enter another
    			$scope.cplants = data; // assign our new list of todos
    		});
		}
    };
}).controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    'use strict';
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug('close LEFT is done');
        });

    };
 });
