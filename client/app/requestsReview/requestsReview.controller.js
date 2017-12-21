/*global angular*/

angular.module('cplantApp').controller('requestsReviewCtrl', function ($scope, $state, AnswersService, UtilityService, $mdUtil, $log, $mdSidenav, NewAppRequestService, FeatureRequestService, BugRequestService, $mdDialog) {
    'use strict';
    $scope.utility = UtilityService;
    $scope.answer = AnswersService;

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
    $scope.newAppRequestService = NewAppRequestService;
    $scope.bugRequestService = BugRequestService;
    $scope.featureRequestService = FeatureRequestService;

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
    $scope.switchValue = 0;
    $scope.changeSwitchContent = function (value) {
        if ($scope.switchValue !== value) {
            $scope.switchValue = value;
        }
        if ($scope.switchValue === 1) {
            $scope.switchContent = false;
            $scope.newAppRequestService.get().then(function (data) {
                $scope.requests = data;
            });
        }
        if ($scope.switchValue === 2) {
            $scope.switchContent = false;
            $scope.bugRequestService.get().then(function (data) {
                $scope.requests = data;
            });
        }
        if ($scope.switchValue === 3) {
            $scope.switchContent = false;
            $scope.featureRequestService.get().then(function (data) {
                $scope.requests = data;
            });
        }
        if ($scope.switchValue === 4) {
            $state.go(UtilityService.MAIN_PAGE, {});
        }
    };

    // Delete a request after checking it
    $scope.deleteRevisionNewAppRequest = function (id) {
        $scope.newAppRequestService.delete(id)
            // if successful creation, call our get function to get all the new todos
            .then(function () {
                $scope.changeSwitchContent(1);
            });
    };
    $scope.deleteRevisionBugRequest = function (id) {
        $scope.bugRequestService.delete(id)
            // if successful creation, call our get function to get all the new todos
            .then(function () {
                $scope.changeSwitchContent(2);
            });
    };
    $scope.deleteRevisionFeaturepRequest = function (id) {
        $scope.featureRequestService.delete(id)
            // if successful creation, call our get function to get all the new todos
            .then(function () {
                $scope.changeSwitchContent(3);
            });
    };
    //Delete confirm
    $scope.showDeleteConfirm = function (ev, id, switchValue) {
        ev.stopPropagation();
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this request ? ')
            .textContent('This request will be deleted in database.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete!')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            if (switchValue === 1) {
                $scope.deleteRevisionNewAppRequest(id);
            }
            if (switchValue === 2) {
                $scope.deleteRevisionBugRequest(id);
            }
            if (switchValue === 3) {
                $scope.deleteRevisionFeaturepRequest(id);
            }
        }, function () {
        });
    };

    $scope.showStatusChange = function (ev, request, switchValue) {
        ev.stopPropagation();
        function DialogController($scope, $mdDialog) {
            $scope.adopt = function () {
                request.requestStatus = 'adopt';
                if (switchValue === 1) {
                    NewAppRequestService.changeStatus(request._id, request).then(function () {});
                }
                if (switchValue === 2) {
                    BugRequestService.changeStatus(request._id, request).then(function () {});
                }
                if (switchValue === 3) {
                    FeatureRequestService.changeStatus(request._id, request).then(function () {});
                }
                $mdDialog.hide();
            };

            $scope.reject = function () {
                request.requestStatus = 'reject';
                if (switchValue === 1) {
                    NewAppRequestService.changeStatus(request._id, request).then(function () {});
                }
                if (switchValue === 2) {
                    BugRequestService.changeStatus(request._id, request).then(function () {});
                }
                if (switchValue === 3) {
                    FeatureRequestService.changeStatus(request._id, request).then(function () {});
                }
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.hide();
            };
        }
        $mdDialog.show({
            controller: DialogController,
            template:
                '<md-dialog aria-label="List dialog">' +
                '  <md-dialog-content>' +
                '     <h1>choose the request Approval status<h1>' +
                '  </md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="adopt()" class="md-primary">' +
                '      adopt !' +
                '    </md-button>' +
                '    <md-button ng-click="reject()" class="md-primary">' +
                '      reject !' +
                '    </md-button>' +
                '    <md-button ng-click="cancel()" class="md-primary">' +
                '      Cancel !' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function () {

        });
    };

    //download attachment
    $scope.downloadAttachment = function (fileName, ev) {
        ev.stopPropagation();
        if (fileName === '') {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('this request has no attachment')
                    .textContent('')
                    .ariaLabel('Alert Dialog')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        } else {
            if ($scope.switchValue === 2) {
                $scope.bugRequestService.download(fileName)
                    // if successful creation, call our get function to get all the new todos
                    .then(function () {});
            }
            if ($scope.switchValue === 3) {
                $scope.featureRequestService.download(fileName)
                    // if successful creation, call our get function to get all the new todos
                    .then(function () {});
            }
        }
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
