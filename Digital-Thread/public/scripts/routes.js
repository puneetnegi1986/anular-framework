/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router', 'controllers/main'], function (angular) {
	'use strict';
	return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

		//Turn on or off HTML5 mode which uses the # hash
		$locationProvider.html5Mode(false);

		/**
		 * Router paths
		 * This is where the name of the route is matched to the controller and view template.
		 */
		$stateProvider
		.state('dashboard', {url: '/dashboard', templateUrl: 'views/dashboard.html'}) 
		.state('addRecord', {url: '/addRecord', templateUrl: 'views/addRecord.html', controller: 'formController'})
		.state('realtime', {url: '/realtime', templateUrl: 'views/realtimemgr.html', controller: 'DashboardCtrl'}) 
		.state('manager', {url: '/manager/:manager_id', templateUrl: 'views/dashboard2.html', controller: 'ManagerCtrl'})
		.state('project', {url: '/project/:project_id', templateUrl: 'views/dashboard3.html', controller: 'ProjectCtrl'});

		$urlRouterProvider
			.otherwise('dashboard');
	}]);
});
