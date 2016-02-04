/*global define */
define(['angular', 'services-module'], function (angular, services) {
	'use strict';
	services.factory('utilService',['$http','$websocket',function($http,$websocket){
		return{
			getData:function(url){
				return $http.get(url);
			},
			getScope:function(id){
				return angular.element(document.getElementById(id)).scope();
			},
			getIsolateScope:function(id){
				return angular.element(document.getElementById(id)).isolateScope();
			},
			getWebSocket:function(url,scope){
				var ws=$websocket("ws://" + document.location.host + "/"+url).onClose(function (event) {			
					console.log('connection closed', event);
				});
				scope.$on('$destroy',function(event){
					ws.close();
				});
				return ws;
			},
			postData:function(url,param){			
				return $http.post(url,param);
		    },
		    putDataIntoTemp:function(template,template_data,callback){
				var return_template_with_data;
				this.getData("scripts/data/chart_template.json").success(function(chart_template){
					console.log(template);
					return_template_with_data=chart_template[template];
					return_template_with_data.series[0].data=template_data.data;
					return_template_with_data.series[1].data=template_data.trend;
					console.log(template_data.trend + "hihhhh....");
					return_template_with_data.xAxis.categories=template_data.axis;
					callback(return_template_with_data);
				});
					
			},
			plotChart:function(template,target_id,template_with_data){
				require([ 'jquery', 'charts'],function($, charts) {
						if(template==="bar_chart"){
							charts.column(document.getElementById(target_id), template_with_data);
						}else
						   if(template==="line_chart"){
							charts.line(document.getElementById(target_id),template_with_data);
						}
					
					});
				
			}
		}
	}]);
	return services;
});







