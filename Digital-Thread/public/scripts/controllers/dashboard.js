define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('DashboardCtrl', ['utilService','$scope', '$rootScope', '$log','$http', function (util,$scope, $rootScope, $log,$http) {
		util.getWebSocket('testwebsocket',$scope).onMessage(function(event){
			var response;
			try {
				response = angular.fromJson(event.data);
				console.log(response);
				if(response.result=="recordsaved"){
					$scope.refreshManagers();
				}
			} catch (e) {
				$scope.test = "Sorry, connection failed ...";
				console.log('error: ', e);
				response = {'error': e};
			}  
		}).onOpen(function(event){
			console.log('connection open');  
        	$scope.refreshManagers();
		});
		
		$scope.refreshManagers=function(){
			$scope.managers_chart_template={};        
        	$scope.managers 
			$http.get("/populateDashBoard").success(function(data){
				$scope.managers = data.managers;
				$http.get("scripts/data/master.json").success(function(chartdata){
	        		$scope.managers_chart_template = chartdata.managers_chart_template;
	        		$scope.chartdata=getManagersChart(data,$scope.managers_chart_template);;
					require(['jquery','charts','datagrids'],function($,charts){
						$(function(){
							$('table[data-table-name="dt-ajax-objects"]').iidsBasicDataGrid({'plugins': ["C"],'useFloater':false,'isResponsive':true,"oColVis": { 
            'aiExclude': [ 1 ], 
            'colVisDropdownSelector': '.col-vis-dropdown-container'
        }});
							charts.columnStacked('chart-column-stacked', $scope.chartdata );  
						});
					});
				});			
			});
		};
	}]).controller('ManagerCtrl', ['utilService','$scope','$stateParams','$rootScope', '$log','$http', function (util,$scope, $stateParams,$rootScope, $log,$http) {
		util.getWebSocket('testwebsocket',$scope).onMessage(function(event){
			var response;
			try {
				response = angular.fromJson(event.data);
				if(response.result=="recordsaved"){
					$scope.refreshProjects();
				}
			} catch (e) {
				$scope.test = "Sorry, connection failed ...";
				console.log('error: ', e);
				response = {'error': e};
			}  
		}).onOpen(function(event){
			console.log('connection open');  
        	$scope.refreshProjects();
		});
		
		$scope.refreshProjects=function(){
			$scope.projects_chart_template={};        
        	$scope.projects =[];
			$scope.manager_id=$stateParams.manager_id;
			$scope.manager_name="";
			$http.get("/populateDashBoard").success(function(data){
				$scope.projects = data.projects[$scope.manager_id];
				$scope.manager_name=$scope.projects[0].manager_name;
				$http.get("scripts/data/master.json").success(function(chartdata){
	        		$scope.projects_chart_template = chartdata.projects_chart_template;
	        		$scope.chartdata=getManagerProjectsChart(data,$scope.manager_id,$scope.projects_chart_template);;
					require(['jquery','charts','datagrids'],function($,charts){
						$(function(){
						charts.columnStacked('chart-column-stacked', $scope.chartdata);  
						});
					});
				});			
			});
		};
	}]).controller('ProjectCtrl', ['utilService','$scope','$stateParams','$rootScope', '$log','$http', function (util,$scope,$stateParams,$rootScope, $log,$http) {	
		util.getWebSocket('testwebsocket',$scope).onMessage(function(event){
			var response;
			try {
				response = angular.fromJson(event.data);
				if(response.result=="recordsaved"){
					$scope.refreshDeliveries();
				}
			} catch (e) {
				$scope.test = "Sorry, connection failed ...";
				console.log('error: ', e);
				response = {'error': e};
			}  
		}).onOpen(function(event){
			console.log('connection open');  
        	$scope.refreshDeliveries();
		});
		$scope.refreshDeliveries=function(){
			$scope.delivery_chart_template={};        
        	$scope.deliverys =[];
			$scope.project_id=$stateParams.project_id;
			$scope.project_name="";
			$scope.manager_id="";
			$scope.manager_name="";
			$http.get("/populateDashBoard").success(function(data){
				$scope.deliverys = data.delivery[$scope.project_id];	
				$scope.project_name=$scope.deliverys[0].Project_name;
				$scope.manager_id=$scope.deliverys[0].manager_id;
				$scope.manager_name=$scope.deliverys[0].manager_name;
				$http.get("scripts/data/master.json").success(function(chartdata){
	        		$scope.delivery_chart_template = chartdata.delivery_chart_template;
	        		$scope.chartdata=getProjectDeliversChart(data,$scope.project_id,$scope.delivery_chart_template);;
					require(['jquery','charts','datagrids'],function($,charts){
						$(function(){
							$('table[data-table-name="dt-ajax-objects"]').iidsBasicDataGrid({'useFloater':false,'isResponsive':true});
							charts.column('chart-column-stacked', $scope.chartdata );  
						});
					});
				});			
			});
		};
	}]).controller('formController', ['utilService','$scope','$stateParams','$rootScope', '$log','$http', function (util,$scope, $stateParams,$rootScope, $log,$http) {
		
		$scope.callWebService= function(){
			console.log($scope.formData);
			$scope.formData.selectedItem=$scope.items[0];
			$http.post("/saveRecord",$scope.formData).success(function(response){
				util.getWebSocket('testwebsocket',$scope).send("recordsaved");
				alert("Your Details Has Been Saved. Thank You!");
				$scope.formData=null;			
				$scope.myForm.$setPristine();
			});
		};		
		$scope.items = [
	        { "id": "1", "name": "OPEN" },
	        { "id": "2", "name": "CLOSED" }
	    ];
	}]);
	//mm/dd/yyyy
	function dateDiff(idate){
		var dueDate=new Date(idate);
	    var today = new Date();
	    var timeDiff = today.getTime() - (dueDate.getTime()+((1000 * 3600 * 24)));
	    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 	  	    
	    return Math.ceil(diffDays)*-1 ;
	}
	function getManagersChart(data,managers_chart_template){
		var categories=new Array();
		var ontime=new Array();
		var ondelay=new Array();
		for(var i=0;i<data.managers.length;i++){
			var projects = data.projects[data.managers[i].mid];
			categories.push(data.managers[i].mid);
			var ob={};
			for(var j=0;j<projects.length;j++){
				var deliverys=data.delivery[projects[j].Project_id];
				var delay=false;
				for(var k=0;k<deliverys.length;k++){
					var days=isNaN(dateDiff(deliverys[k].Due_Date))?-3:dateDiff(deliverys[k].Due_Date);
					delay=days<0?true:false;
					k=delay?deliverys.length:k;
				}
				delay?ob.delay=ob.delay!=undefined?ob.delay+1:1:ob.ontime=ob.ontime!=undefined?ob.ontime+1:1;
			}
			ontime.push(ob.ontime!=undefined?ob.ontime:0);
			ondelay.push(ob.delay!=undefined?ob.delay:0);
		}
		var series=new Array;
		
		series.push({"name":"On Time","data":ontime});
		series.push({"name":"Delay","data":ondelay});
		managers_chart_template.series=series;
		managers_chart_template.xAxis.categories=categories;
		return managers_chart_template;
	}
	function getManagerProjectsChart(data,manager_id,projects_chart_template){
		var projects = data.projects[manager_id];
		var categories=new Array();
		var ontime=new Array();
		var ondelay=new Array();
		var onhighdelay=new Array();
		for(var j=0;j<projects.length;j++){
			categories.push(data.projects[manager_id][j].Project_id);
			var ob={};
			var deliverys=data.delivery[projects[j].Project_id];
			for(var k=0;k<deliverys.length;k++){
				var days=isNaN(dateDiff(deliverys[k].Due_Date))?-3:dateDiff(deliverys[k].Due_Date);
				if(days>=0){ob.ontime=ob.ontime!=undefined?ob.ontime+1:1;}else if(days<-3){ob.onhighdelay=ob.onhighdelay!=undefined?ob.onhighdelay+1:1;}else if(days<0){ob.ondelay=ob.ondelay!=undefined?ob.ondelay+1:1;}
			}
			ontime.push(ob.ontime!=undefined?ob.ontime:0);
			ondelay.push(ob.ondelay!=undefined?ob.ondelay:0);
			onhighdelay.push(ob.onhighdelay!=undefined?ob.onhighdelay:0);
		}
		var series=new Array;
		series.push({"name":"On Time","data":ontime});
		series.push({"name":"Delay > 3 Days","data":onhighdelay});
		series.push({"name":"Delay < 3 Days","data":ondelay});
		projects_chart_template.series=series;
		projects_chart_template.xAxis.categories=categories;
		return projects_chart_template;
	}
	function getProjectDeliversChart(data,project_id,delivery_chart_template){
		var categories=new Array();
		var series=new Array();
		var colors=new Array();
		var deliverys=data.delivery[project_id]; 
		for(var i=0;i<deliverys.length;i++){
			categories.push(data.delivery[project_id][i].Delivery_name);
			var days=isNaN(dateDiff(deliverys[i].Due_Date))?-3:dateDiff(deliverys[i].Due_Date);
			colors.push(days>=0?"green":days<-3?"red":days<0?"#FFC200":"black");
			series.push({"name":categories[i],"data":[days]});	
		}
		delivery_chart_template.series=series;
		delivery_chart_template.colors=colors;
		return delivery_chart_template;
	}		
});

