'use strict';

angular.module('myApp.view1', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('view1', {
    url: '/view1',
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
})

.controller('View1Ctrl', function($scope) {
    console.log('jejejej controlador vista 1');

    $scope.enviar = function(){
        alert("ventana del controlador 1")
    };
    $scope.var1 = "variable controlador 1";
});