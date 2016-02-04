define(['angular', 'controllers-module'], function (angular, controllers) {
	'use strict';
	return controllers.controller('TableCtrl', ['utilService','cookieService','$scope','$stateParams','$rootScope', '$log','$http','$websocket', function (util,cookieStore,$scope, $stateParams,$rootScope, $log,$http,$websocket) {	
	
	$scope.customerscode=[];
	$scope.failurcode=[];
	$scope.location=[];
	$scope.loggedby=[];
	$scope.chartdata={"failure_code":[],"customer_Code":[],"logged_Location":[],"logged_By":[],"logged_Date":[],"ticket_Number":[]};
	
	util.getData('/getTableData').success(function(data){
		
		$scope.data=data;
		$.each($scope.data,function(index,value){
			if($.inArray(value['customer_Code'],$scope.customerscode)===-1){
				$scope.customerscode.push(value['customer_Code']);
			}
			if($.inArray(value['failure_code'],$scope.failurcode)===-1){
				$scope.failurcode.push(value['failure_code']);
			}
			if($.inArray(value['logged_Location'],$scope.location)===-1){
				$scope.location.push(value['logged_Location']);
			}
			if($.inArray(value['logged_By'],$scope.loggedby)===-1){
				$scope.loggedby.push(value['logged_By']);
			}				
		});
		if(cookieStore.checkCookie("tblcodecookie")!=""){
			$.each($scope.customerscode,function(index,value){
				var check=$.inArray(value,cookieStore.getCookie("tblcodecookie").split(","))!=-1;
				$scope.customerscode[index]={'value':value,'checked':check};
			});
			$.each($scope.failurcode,function(index,value){
				var check=$.inArray(value,cookieStore.getCookie("tblfailcodecookie").split(","))!=-1;
				$scope.failurcode[index]={'value':value,'checked':check};
			});
			$.each($scope.location,function(index,value){
				var check=$.inArray(value,cookieStore.getCookie("tblloccookie").split(","))!=-1;
				$scope.location[index]={'value':value,'checked':check};
			});
			$.each($scope.loggedby,function(index,value){
				var check=$.inArray(value,cookieStore.getCookie("tblloggedbycookie").split(","))!=-1;
				$scope.loggedby[index]={'value':value,'checked':check};
			});
		}else{
			$.each($scope.customerscode,function(index,value){
				$scope.customerscode[index]={'value':value,'checked':true};
			});
			$.each($scope.failurcode,function(index,value){
				$scope.failurcode[index]={'value':value,'checked':true};
			});
			$.each($scope.location,function(index,value){
				$scope.location[index]={'value':value,'checked':true};
			});
			$.each($scope.loggedby,function(index,value){
				$scope.loggedby[index]={'value':value,'checked':true};
			});
		}
		
		$scope.$watch('customerscode', function() {
			update_row();
		}, true);
		$scope.$watch('failurcode', function() {
			update_row();
		}, true);
		$scope.$watch('location', function() {
			update_row();
		}, true);
		$scope.$watch('loggedby', function() {
			update_row();
		}, true);
		$scope.bkpdata=$scope.data;
	});
		
	var update_row=function(){
		$scope.customerscodechk=[];
		$scope.failurcodechk=[];
		$scope.locationchk=[];
		$scope.loggedbychk=[];			
		$scope.data=$scope.bkpdata;
		$.each($scope.customerscode,function(index,value){			
			value.checked?$scope.customerscodechk.push(value.value):'';
		});
		$.each($scope.failurcode,function(index,value){
			value.checked?$scope.failurcodechk.push(value.value):'';
		});
		$.each($scope.location,function(index,value){
			value.checked?$scope.locationchk.push(value.value):'';
		});
		$.each($scope.loggedby,function(index,value){
			value.checked?$scope.loggedbychk.push(value.value):'';
		});
		cookieStore.setCookie("tblcodecookie",$scope.customerscodechk.toString(),2);
		cookieStore.setCookie("tblfailcodecookie",$scope.failurcodechk.toString(),2);
		cookieStore.setCookie("tblloccookie",$scope.locationchk.toString(),2);
		cookieStore.setCookie("tblloggedbycookie",$scope.loggedbychk.toString(),2);
		var res=[];
		$.each($scope.data,function(index,value){				
			if($.inArray(value['customer_Code'],$scope.customerscodechk)!=-1 && $.inArray(value['failure_code'],$scope.failurcodechk)!=-1 && $.inArray(value['logged_Location'],$scope.locationchk)!=-1 && $.inArray(value['logged_By'],$scope.loggedbychk)!=-1){
				res.push(value);
			}
		});
		$scope.data=res;
		
		 var chartScope=util.getScope("tablechart");
		chartScope.initFilterTable();
	};
	
	
  
	$scope.ordered_columns = [];
	$scope.all_columns = [{"title": "Ticket Number","type": "string","checked": true}, 
						  {"title": "Customer Code","type": "number","checked": true}, 
						  {"title": "Failure Code","type": "string","checked": true}, 
						  {"title": "Logged Date","type": "string","checked": true}, 
						  {"title": "Logged By","type": "string","checked": true}, 
						  {"title": "Logged Location","type": "string","checked": false}];
	if(cookieStore.checkCookie("tblFailC1")!=""){
		$scope.ordered_columns = [];
		for (var i = 0; i < $scope.all_columns.length; i++) {
			var column = $scope.all_columns[i];
			column.checked=cookieStore.getCookie("tblFailC"+parseInt(i+1))=="true"?true:false;
			if (column.checked) {
				$scope.ordered_columns.push(column);
			}
		}
	}else{
		$scope.ordered_columns = [];
		for (var i = 0; i < $scope.all_columns.length; i++) {
			var column = $scope.all_columns[i];
			column.checked=true;
			$scope.ordered_columns.push(column);
		}
	}	
	$scope.$watch('all_columns', function() {
    update_columns();
  }, true);

  
	var update_columns = function() {
    $scope.ordered_columns = [];
    for (var i = 0; i < $scope.all_columns.length; i++) {
      var column = $scope.all_columns[i];
      if (column.checked) {		
        $scope.ordered_columns.push(column);
      }
	  cookieStore.setCookie("tblFailC"+parseInt(i+1),column.checked,2);
    }
  };
  
   
		
	}]);
	
	
	
	
});

