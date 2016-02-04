/*global define */
define(['angular', 'directives-module'], function (angular, directives) {
	'use strict';
	directives.directive('bslTableColumnToggle', ['utilService', 'cookieService', '$stateParams', '$rootScope', '$log', '$http', '$websocket', function (util, cookieStore, $stateParams, $rootScope, $log, $http, $websocket) {
				return {
					restrict : 'E',
					transclude : true,
					replace : true,
					scope : {
						targetid : '@',
						heading : '@'
					},
					templateUrl : '../../views/tablecolumntoggle.html',
					controller : function ($scope) {
						$scope.heading = $scope.heading != undefined ? $scope.heading : 'Hide/Show Columns';
						var tblScope = util.getIsolateScope($scope.targetid);
						$scope.columns = [];
						tblScope.$watch('columns', function () {
							$scope.initData();
						}, true);
						$scope.initData=function(){
							if($scope.columns.length==0){
								angular.forEach(tblScope.columns, function (value, key) {							
									$scope.columns.push({"custom" : value.custom,"original":value.original,"checked":true});
								});
								$scope.$watch('columns', function () {
									$scope.filterColumn();
								}, true);
							}
						};
						$scope.filterColumn=function(){
							if($scope.columns.length>0){
								var visibleColumn=new Array();
								angular.forEach($scope.columns, function (value, key) {
									if(value.checked){
										visibleColumn.push(value);
									}
								});
								tblScope.columns=visibleColumn;
							}
						};
					},
					controllerAs : 'bslTblColToggleCtrl',
					link : function (scope, element, attrs) {
						console.log(element);
					}
				};
			}
		]);

	return directives;
});
