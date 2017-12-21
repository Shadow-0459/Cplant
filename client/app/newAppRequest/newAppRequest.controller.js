/*global angular*/

angular.module('cplantApp').controller('newAppRequestCtrl', function ($scope, $state, UtilityService, AnswersService, NewAppRequestService, $mdSidenav, $mdUtil, $log, $mdDialog) {
    'use strict';
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;
    $scope.newAppRequestService = NewAppRequestService;

    //sidenav create
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug('toggle ' + navID + ' is done');
                });
        }, 300);
        return debounceFn;
    }
    $scope.toggleLeft = buildToggler('left');
    $scope.lockLeft = true;
    $scope.requests = [];



    //logOut or not
    $scope.logOutIS = false;
    $scope.logOutOpen = function () {
        $scope.logOutIS = !$scope.logOutIS;
    };
    $scope.logOut = function () {
        $scope.logOutIS = false;
        $state.go(UtilityService.LOG_IN_PAGE, {});
    };

    //Switch sidenav function
    $scope.switchContent = true;
    $scope.switchValue = 1;
    $scope.changeSwitchContent = function (value) {
        $scope.requests = [];
        if ($scope.switchValue !== value) {
            $scope.switchValue = value;
            $scope.switchContent = !$scope.switchContent;
        }
        if ($scope.switchValue === 2) {
            //Check out requests from database
            $scope.newAppRequestService.get().then(function (requestsdata) {
                requestsdata.data.forEach(function (element) {
                    if (element.requester === 'Beckham') {
                        $scope.requests.push(element);
                    }
                });
            });
        }
        if ($scope.switchValue === 3) {
            $state.go(UtilityService.MAIN_PAGE, {});
        }
    };


    $scope.checkboxRequired = true;
    $scope.changeCheckboxRequired = function () {
        $scope.checkboxRequired = !$scope.checkboxRequired;

    };

    // Create a new app request after checking it
    $scope.newAppRequest = function () {
        if ($scope.newAppRequestForm.$error.required) {
            // var element = angular.element(document.getElementsByName($scope.newAppRequestForm.$error.required[0].$name)[0]);
            // var Form = angular.element(document.getElementById('newAppRequestForm'));
            $scope.newAppRequestForm.$error.required.forEach(function (field) {
                field.$setDirty();
            });
            UtilityService.scrollToElement($scope.newAppRequestForm.$error.required[0].$name, 'newAppRequestForm');
            // Form.scrollToElement(element,0,1000);
            //console.log($scope.CplantForm.$error.required[0].$name);

        }
        if (!$scope.newAppRequestForm.$invalid) {
            if ($scope.answer.appName !== '') {
                if ($scope.answer.product === 'Other-product') {
                    $scope.answer.product = $scope.answer.productOther;
                }
                if ($scope.answer.belongTo === 'Other-tool') {
                    $scope.answer.belongTo = $scope.answer.belongToOther;
                }
                if ($scope.answer.caseOpenDay === 'Other-case') {
                    $scope.answer.caseOpenDay = $scope.answer.caseOpenDayOther;
                }
                if ($scope.answer.userCustomers === true) {
                    $scope.answer.toolUser = $scope.answer.toolUser + 'Customers' + ' | ';
                }
                if ($scope.answer.userSDSCET === true) {
                    $scope.answer.toolUser = $scope.answer.toolUser + 'Support Delivery / Strategic Customer Engagement teams' + '|';
                }
                if ($scope.answer.userOther === true) {
                    $scope.answer.toolUser = $scope.answer.toolUser + $scope.answer.userOtherContent;
                }

                $scope.newAppRequestService.create($scope.answer)
                //if successful creation, call our get function to get all the new todos
                    .then(function () {
                        $scope.answer = {}; // clear the form so our user is ready to enter another
                    });
            }
            $scope.changeSwitchContent(2);
        } else {

            return false;
        }
    };

    // Delete a request after checking it
    $scope.deleteNewAppRequest = function (id) {
        $scope.newAppRequestService.delete(id)
            // if successful creation, call our get function to get all the new todos
            .then(function () {
                $scope.changeSwitchContent(2);
            });
    };

    //Delete confirm
    $scope.showConfirm = function (ev, id) {
        ev.stopPropagation();
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your request ? ')
            .textContent('This request will be deleted in database.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete!')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $scope.deleteNewAppRequest(id);
        }, function () {
        });
    };

}).controller('LeftCtrl', function ($scope, $mdSidenav, $log) {
    'use strict';
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug('close LEFT is done');
            });

    };
});
