/*global angular*/

angular.module('cplantApp').controller('bugRequestCtrl', function ($scope, $state, AnswersService, UtilityService, $mdSidenav, $mdUtil, $log, BugRequestService, $mdDialog, Upload) {
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
    $scope.bugRequestService = BugRequestService;
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
            $scope.bugRequestService.get().then(function (requestsdata) {
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

    // Create a bug request after checking it
    $scope.bugRequest = function (picFile) {
        if ($scope.bugRequestForm.$error.required) {
            $scope.bugRequestForm.$error.required.forEach(function (field) {
                field.$setDirty();
            });
            UtilityService.scrollToElement($scope.bugRequestForm.$error.required[0].$name, 'bugRequestForm');
        }
        if (!$scope.bugRequestForm.$invalid) {
            if ($scope.answer.bugSummary !== '') {
                //create request's content
                $scope.bugRequestService.create($scope.answer)
                // if successful creation, call our get function to get all the new todos
                    .then(function (data) {

                    //upload file
                        if ($scope.picFile) {
                            $scope.bugRequestStack = data.data[data.data.length - 1];
                            $scope.bugRequestStack.fileName = data.data[data.data.length - 1]._id + '.' + picFile.name.split('.')[picFile.name.split('.').length - 1];
                            if ($scope.picFile) {
                                Upload.rename(picFile, $scope.bugRequestStack.fileName);
                                Upload.upload({
                                    url: '/labs/cplant/uploadBugRequestFile',
                                    data: {
                                        file : picFile
                                    }
                                }).then(function () {}, function (evt) {
                                  // Math.min is to fix IE which reports 200% sometimes
                                    picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                }, function (response) {
                                    if (response.status > 0) {
                                        $scope.errorMsg = response.status + ': ' + response.data;
                                    }
                                });
                            }
                            $scope.bugRequestService.addFileName($scope.bugRequestStack._id, $scope.bugRequestStack).then(function () {});
                        }


                        $scope.answer = {}; // clear the form so our user is ready to enter another
                        $scope.changeSwitchContent(2);
                    });
            }
        } else {
            return false;
        }
    };

    // Delete a request after checking it
    $scope.deleteBugRequest = function (id) {
        $scope.bugRequestService.delete(id)
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
            $scope.deleteBugRequest(id);
        }, function () {
        });
    };

    //Download attachment
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
            $scope.bugRequestService.download(fileName)
                // if successful creation, call our get function to get all the new todos
                .then(function () {});
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
