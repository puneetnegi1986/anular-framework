angular.module('docsSimpleDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    template: 'Name: {{customer.name}} Address: {{customer.address}}'
  };
});
index.html
<div ng-controller="Controller">
  <div my-customer></div>
</div>
/********************************************************************************/
angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: 'my-customer.html'
  };
});
index.html
<div ng-controller="Controller">
  <div my-customer></div>
</div>
my-customer.html
Name: {{customer.name}} Address: {{customer.address}}
/***********************************************************/

angular.module('docsTemplateUrlDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '1600 Amphitheatre'
  };
}])
.directive('myCustomer', function() {
  return {
    templateUrl: function(elem, attr){
      return 'customer-'+attr.type+'.html';
    }
  };
});
index.html
<div ng-controller="Controller">
  <div my-customer type="name"></div>
  <div my-customer type="address"></div>
</div>
customer-name.html
Name: {{customer.name}}
customer-address.html
Address: {{customer.address}}

/**********************************************************************/
angular.module('docsIsolateScopeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
}])
.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '=info'
    },
    templateUrl: 'my-customer-iso.html'
  };
});

index.html
<div ng-controller="Controller">
  <my-customer info="naomi"></my-customer>
  <hr>
  <my-customer info="igor"></my-customer>
</div>
my-customer-iso.html
Name: {{customerInfo.name}} Address: {{customerInfo.address}}

/***********************************************************************/
angular.module('docsTimeDirective', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}])
.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var format,
        timeoutId;

    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }

    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }

  return {
    link: link
  };
}]);
index.html
<div ng-controller="Controller">
  Date format: <input ng-model="format"> <hr/>
  Current time is: <span my-current-time="format"></span>
</div>

scope is an Angular scope object.
element is the jqLite-wrapped element that this directive matches.
attrs is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.
controller is the directive's required controller instance(s) or its own controller (if any). The exact value depends on the directive's require property.
transcludeFn is a transclude linking function pre-bound to the correct transclusion scope.

/************************************************************************/

angular.module('docsTransclusionExample', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.name = 'Tobias';
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'my-dialog.html',
    link: function (scope, element) {
      scope.name = 'Jeff';
    }
  };
});
index.html
<div ng-controller="Controller">
  <my-dialog>Check out the contents, {{name}}!</my-dialog>
</div>
my-dialog.html
<div class="alert" ng-transclude>
</div>
/****************************************************************************/
angular.module('docsIsoFnBindExample', [])
.controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.name = 'Tobias';
  $scope.message = '';
  $scope.hideDialog = function (message) {
    $scope.message = message;
    $scope.dialogIsHidden = true;
    $timeout(function () {
      $scope.message = '';
      $scope.dialogIsHidden = false;
    }, 2000);
  };
}])
.directive('myDialog', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'my-dialog-close.html'
  };
});
index.html
<div ng-controller="Controller">
  {{message}}
  <my-dialog ng-hide="dialogIsHidden" on-close="hideDialog(message)">
    Check out the contents, {{name}}!
  </my-dialog>
</div>
my-dialog-close.html
<div class="alert">
  <a href class="close" ng-click="close({message: 'closing for now'})">&times;</a>
  <div ng-transclude></div>
</div>
/******************************************************************/
angular.module('dragModule', [])
.directive('myDraggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);
index.html
<span my-draggable>Drag ME</span>

/**********************************************************************************/
angular.module('docsTabsExample', [])
.directive('myTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: ['$scope', function($scope) {
      var panes = $scope.panes = [];

      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    }],
    templateUrl: 'my-tabs.html'
  };
})
.directive('myPane', function() {
  return {
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    templateUrl: 'my-pane.html'
  };
});
index.html
<my-tabs>
  <my-pane title="Hello">
    <h4>Hello</h4>
    <p>Lorem ipsum dolor sit amet</p>
  </my-pane>
  <my-pane title="World">
    <h4>World</h4>
    <em>Mauris elementum elementum enim at suscipit.</em>
    <p><a href ng-click="i = i + 1">counter: {{i || 0}}</a></p>
  </my-pane>
</my-tabs>
my-tabs.html
<div class="tabbable">
  <ul class="nav nav-tabs">
    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">
      <a href="" ng-click="select(pane)">{{pane.title}}</a>
    </li>
  </ul>
  <div class="tab-content" ng-transclude></div>
</div>
my-pane.html
<div class="tab-pane" ng-show="selected" ng-transclude>
</div>
/*********************************************************************************/
Dynamically add controller
// Make module Foo and store $controllerProvider in a global
var controllerProvider = null;
angular.module('Foo', [], function($controllerProvider) {
    controllerProvider = $controllerProvider;
});
// Bootstrap Foo
angular.bootstrap($('body'), ['Foo']);

// .. time passes ..

// Load javascript file with Ctrl controller
angular.module('Foo').controller('Ctrl', function($scope, $rootScope) {
    $scope.msg = "It works! rootScope is " + $rootScope.$id +
        ", should be " + $('body').scope().$id;
});
// Load html file with content that uses Ctrl controller
$('<div id="ctrl" ng-controller="Ctrl" ng-bind="msg">').appendTo('body');

// Register Ctrl controller manually
// If you can reference the controller function directly, just run:
// $controllerProvider.register(controllerName, controllerFunction);
// Note: I haven't found a way to get $controllerProvider at this stage
//    so I keep a reference from when I ran my module config
function registerController(moduleName, controllerName) {
    // Here I cannot get the controller function directly so I
    // need to loop through the module's _invokeQueue to get it
    var queue = angular.module(moduleName)._invokeQueue;
    for(var i=0;i<queue.length;i++) {
        var call = queue[i];
        if(call[0] == "$controllerProvider" &&
           call[1] == "register" &&
           call[2][0] == controllerName) {
            controllerProvider.register(controllerName, call[2][1]);
        }
    }
}
registerController("Foo", "Ctrl");
// compile the new element
$('body').injector().invoke(function($compile, $rootScope) {
    $compile($('#ctrl'))($rootScope);
    $rootScope.$apply();
});

/*****************************************************************/

$.ajax({
    url: 'example.html',
    type: 'GET',
    success: function(data) {

        var dom = $(data);

        dom.filter('script').each(function(){
            $.globalEval(this.text || this.textContent || this.innerHTML || '');
        });

        $('#mydiv').html(dom.find('#something').html());

    }
});
$.ajax({
    url: 'example.html',
    type: 'GET',
    success: function(data) {

        var content = $($.parseHTML(data, document, true)).find('#something');
        $('#mydiv').html(content);

    }
});
