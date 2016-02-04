/*global define */
define(['angular', 'directives-module'], function (angular, directives) {
	'use strict';

	/* Directives  */
	directives.directive('tableRecord', ['version', function (version) {
		return {
			restrict: 'E',
			templateUrl:'../../views/table.html'
		};
	}]);

	return directives;
});
