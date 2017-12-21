/*global angular, document, console*/

angular.module('cplantApp').factory('NewAppRequestService', function ($http) {
    'use strict';
    return {
        get : function () {
            return $http.get('/labs/cplants/getNewAppRequests');
        },
        create : function (newApp) {
            return $http.post('/labs/cplant/newAppRequest', newApp);
        },
        delete : function (id) {
            return $http.delete('/labs/cplant/newAppRequestDelete/' + id);
        },
        changeStatus : function (id, request) {
            return $http.put('/labs/cplant/changeNewAppRequestStatus/' + id, request);
        }
    };
});
