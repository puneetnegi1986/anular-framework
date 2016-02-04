define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('bslTableCtrl', ['utilService','cookieService','$scope','$stateParams','$rootScope', '$log','$http','$websocket', function (util,cookieStore,$scope, $stateParams,$rootScope, $log,$http,$websocket) {	
			alert($scope.url);
			$scope.url="this is ";

	}]);
});

