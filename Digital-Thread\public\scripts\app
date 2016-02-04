/** global angular, require */
/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
	'require',
	'jquery',
	'angular',
	'angular-resource',
	'angular-websocket',
	'vruntime',
	'directives/main',
	'filters/main',
	'services/main',
	'controllers/main',
	'routes',
	'interceptors'
], function (require, $, angular, ngResource,ngWebSocket,  vRuntime
						 /*, directives, filters, services, controllers, routes, interceptors*/) {
	'use strict';

	/**
	 * Application definition
	 * This is where the AngularJS application is defined and all application dependencies declared.
	 * @type {module}
	 */
	var predixApp = angular.module('predixApp', [
		'ngResource',
		'ngWebSocket',
		'app.controllers',
		'app.directives',
		'app.services',
		'app.filters',
		'app.routes',
		'app.interceptors'
	]);

	predixApp.run(function () {
		// Application DataSources are defined here
		//vRuntime.datasource.create('ScatterChart', 'http://sjc1dsppf09.crd.ge.com:9090/service/dummydata/line', {});
	});

	/**
	 * Main Controller
	 * This controller is the top most level controller that allows for all
	 * child controllers to access properties defined on the $rootScope.
	 */
	predixApp.controller('MainCtrl', ['cookieService','$scope', '$rootScope', function (cookieStore,$scope, $rootScope) {
		if(cookieStore.checkCookie("current_user")==""){
			window.location.replace("/login");
		}
		//Global application object
		window.App = $rootScope.App = {
			version: '1.0',
			name: 'Digital Thread POC',
			session: {},
			tabs: [
				{state: 'dashboard', label: vRuntime.messages('Dashboard')},
				{state: 'realtime', label: vRuntime.messages('RealTime')},
				{state: 'addRecord', label: vRuntime.messages('Add Record')}
			]
		};
		App.current_user=cookieStore.getCookie("current_user");
		//Unbind all widgets from datasources and widgets when page changes
		$rootScope.$on('$routeChangeStart', function () {
			vRuntime.binder.unbindAll();
		});

		$rootScope.logout = function (event) {
			event.preventDefault();
			location.replace('logout');
		};

	}]);

	//Set on window for debugging
	window.predixApp = predixApp;

	//Return the application  object
	return predixApp;
});
