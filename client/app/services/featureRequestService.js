/*global angular, document, console*/

angular.module('cplantApp').factory('FeatureRequestService', function ($http) {
    'use strict';
    return {
        get : function () {
            return $http.get('/labs/cplants/getFeatureRequests');
        },
        create : function (feature) {
            return $http.post('/labs/cplant/featureRequest', feature);
        },
        delete : function (id) {
            return $http.delete('/labs/cplant/featureRequestDelete/' + id);
        },
        changeStatus : function (id, request) {
            return $http.put('/labs/cplant/changeFeatureRequestStatus/' + id, request);
        },
        addFileName : function (id, request) {
            return $http.put('/labs/cplant/addFeatureRequestFileName/' + id, request);
        },
        download : function (fileName) {
            return $http.get('/labs/cplants/featureRequestDownload/' + fileName);
        }
    };
});
