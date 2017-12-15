/*global angular, document, console*/

angular.module('cplantApp').factory('CreateCplantService', function($http) {
    'use strict';
	return {
		create : function(cplantData) {
			return $http.post('/labs/cplant', cplantData);
		}
	};
});
