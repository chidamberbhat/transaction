'use strict';
angular.module('monthlyApp', [
    'ngRoute',
    'monthlyApp',
    'monthlyDirectives',
    'ui.bootstrap',
    'ngAnimate',
    'ngTouch'    
])

.config(function($routeProvider) {
    $routeProvider
        .when('/', { redirectTo: 'home'})
        .when('/home', {templateUrl : 'pages/main.html'})
        .when('/listAccounts', {templateUrl : 'pages/accounts.html'})
        .otherwise({redirectTo: '/'});
});