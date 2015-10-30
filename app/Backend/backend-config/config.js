'use strict';

angular.module('myApp.config', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('config', {
    url: '/config',
    templateUrl: '/config.html',
    controller: 'ConfigCtrl'
  });
})

.controller('ConfigCtrl', function($scope, $http) {
        $scope.variableCtrl2 = 'contenido del la variable 2';
        console.log("controlador backend-config");

        $scope.list = [1,2,3,4,5,6];

});