/*global angular*/

angular.module('cplantApp').controller('featureRequestCtrl', function ($scope, $state, AnswersService, UtilityService, $mdUtil, $log, $mdSidenav, FeatureRequestService, $mdDialog, Upload) {
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
    $scope.featureRequestService = FeatureRequestService;
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
            $scope.featureRequestService.get().then(function (requestsdata) {
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

    // Create a feature request after checking it
    $scope.featureRequest = function (picFile) {
        if ($scope.featureRequestForm.$error.required) {
            $scope.featureRequestForm.$error.required.forEach(function (field) {
                field.$setDirty();
            });
            UtilityService.scrollToElement($scope.featureRequestForm.$error.required[0].$name, 'featureRequestForm');

        }
        if (!$scope.featureRequestForm.$invalid) {
            if ($scope.answer.featureSubject !== '') {
                //create request's content
                $scope.featureRequestService.create($scope.answer)
                // if successful creation, call our get function to get all the new todos
                    .then(function (data) {

                        //upload file
                        if ($scope.picFile) {
                            $scope.featureRequestStack = data.data[data.data.length - 1];
                            $scope.featureRequestStack.fileName = data.data[data.data.length - 1]._id + '.' + picFile.name.split('.')[picFile.name.split('.').length - 1];
                            if ($scope.picFile) {
                                Upload.rename(picFile, $scope.featureRequestStack.fileName);
                                Upload.upload({
                                    url: '/labs/cplant/uploadFeatureRequestFile',
                                    data: {
                                        file : picFile
                                    }
                                }).then(function (response) {
                                    picFile.result = response.data;
                                }, function (evt) {
                                  // Math.min is to fix IE which reports 200% sometimes
                                    picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                }, function (response) {
                                    if (response.status > 0) {
                                        $scope.errorMsg = response.status + ': ' + response.data;
                                    }
                                });
                            }
                            $scope.featureRequestService.addFileName($scope.featureRequestStack._id, $scope.featureRequestStack).then(function () {});
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
    $scope.deleteFeatureRequest = function (id) {
        $scope.featureRequestService.delete(id)
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
        $mdDialog.show(confirm).then(function (result) {
            $scope.deleteFeatureRequest(id);
        }, function () {
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
            $scope.featureRequestService.download(fileName)
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
