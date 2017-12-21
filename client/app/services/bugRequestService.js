/*global angular, document, console*/

angular.module('cplantApp').factory('BugRequestService', function ($http) {
    'use strict';
    return {
        get : function () {
            return $http.get('/labs/cplants/getBugRequests');
        },
        create : function (bug) {
            return $http.post('/labs/cplant/bugRequest', bug);
        },
        delete : function (id) {
            return $http.delete('/labs/cplant/bugRequestDelete/' + id);
        },
        changeStatus : function (id, request) {
            return $http.put('/labs/cplant/changeBugRequestStatus/' + id, request);
        },
        addFileName : function (id, request) {
            return $http.put('/labs/cplant/addBugRequestFileName/' + id, request);
        },
        download : function (fileName) {
            return $http.get('/labs/cplants/bugRequestDownload/' + fileName);
        }
    };
});
