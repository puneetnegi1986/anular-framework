/*global define */
define(['angular', 'directives-module'], function (angular, directives) {
	'use strict';
	directives.directive('bslTableFilter', ['utilService', 'cookieService', '$stateParams', '$rootScope', '$log', '$http', '$websocket', function (util, cookieStore, $stateParams, $rootScope, $log, $http, $websocket) {
				return {
					restrict : 'E',
					transclude : true,
					replace : true,
					scope : {
						heading : '@',
						targetid : '@',
						filtercolumn : '@'
					},
					templateUrl : '../../views/tablefilter.html',
					controller : function ($scope) {
						$scope.columns = [];
						$scope.tempdata=[];
						$scope.heading = $scope.heading != undefined ? $scope.heading : 'Filters';
						$scope.filtercolumn = $scope.filtercolumn != undefined ? JSON.parse($scope.filtercolumn) : [];
						
						var tblScope = util.getIsolateScope($scope.targetid);
						
						tblScope.$watch('columns', function () {
							$scope.initFilterData();
						}, true);						
						$scope.initFilterData = function () {
							if($scope.columns.length==0){
								$scope.tempdata=tblScope.data;
								angular.forEach(tblScope.columns, function (value, key) {
									$scope.columns.push({"header" : value.custom,"original":value.original});
									angular.forEach(tblScope.data, function (value1, key1) {
										if ($scope.columns[key].filterlist == undefined) {
											$scope.columns[key].filterlist = [];
										}
										if ($scope.columns[key].filterlist.filter(function (el) {return el.value == value1[value.original];}).length == 0) {
											$scope.columns[key].filterlist.push({'value' : value1[value.original],'checked' : true});
										}
									});								
								});
								for(var i=tblScope.columns.length-1;i>-1;i--){
									if($.inArray(""+i,$scope.filtercolumn)===-1){
										$scope.columns.splice(i,1);
									}
								}
								$scope.$watch('columns', function () {
									$scope.filterRow();
								}, true);
							}
						};
						
						$scope.filterRow=function(){							
							if(tblScope.data!=undefined){
								tblScope.data=$scope.tempdata;
								var res=[];
								angular.forEach(tblScope.data,function(value,key){
									var resFlag=true;									
									angular.forEach($scope.columns,function(value1,key1){
										if(!(value1.filterlist.filter(function(el){return el.value==value[value1.original] && el.checked==true;}).length>0)){
											resFlag=false;
										}									
									});
									if(resFlag){
										res.push(value);
									}
								});
								tblScope.data=res;
							}							
						};						
						//[{"header":"Header",filterlist:[{value:value,checked:checked}]}]
					},
					link : function (scope, element, attrs) {
						console.log(element);
					}
				};
			}
		]);

	return directives;
});
