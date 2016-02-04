define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('ChartsCtrl', ['utilService','cookieService','$scope','$stateParams','$rootScope', '$log','$http', function (utilService,cookieStore,$scope, $stateParams,$rootScope, $log,$http) {
		$scope.trendValue= 1;
		$scope.trendValue1= 1;
		$scope.selectData = [{"key": "line_chart","value": "Line Chart"}, 
							  {"key": "bar_chart","value": "Bar Chart"}];
		$scope.selectedData = "line_chart";
		$scope.selectedData1 = "bar_chart";
		$http.post("/saveData",{data:{"ticket_Number":"AVI17777","customer_Code":"DEA07","failure_code":"OC","logged_By":"Apr/03/2015","logged_Date":"John","logged_Location":"U.S.A."}}).success(function(response){
			console.log(response);
			alert("Saved Successfully "+response);
		});
		console.log((new Date()).getMilliseconds());
		var prepareChart=function(options){
			utilService.getData("/"+options.url).success(function(chartdata){
				   var dataLenght=chartdata.data.length;
				   var trendData = [];
				   for(var i=0;i<dataLenght;i++){
					   trendData.push(options.trend_value===''?'':parseInt(options.trend_value));  
				   }
				   chartdata.trend=trendData;
				   utilService.putDataIntoTemp(options.chart_type,chartdata,function(template_with_data){
					   utilService.plotChart(options.chart_type,options.target_id,template_with_data);
					   console.log((new Date()).getMilliseconds());
				   });
				});
		};
		 $scope.$watch('[trendValue,selectedData]', function() {
			 var options={};
			 options.url='getChartData';
			 options.trend_value=$scope.trendValue;
			 options.target_id='chart-div';
			 options.chart_type=$scope.selectedData;
			 prepareChart(options);
		  }, true);
		 $scope.$watch('[trendValue1,selectedData1]', function() {
			 var options={};
			 options.url='getLoggedDateDataMap';
			 options.trend_value=$scope.trendValue1;
			 options.target_id='chart-div1';
			 options.chart_type=$scope.selectedData1;
			 prepareChart(options);
			  }, true);
		$log.info('about controller loaded!');
		$scope.initFilterTable=function(){
		};		
	}]);
});
