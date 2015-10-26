'use strict';

angular.module('myApp.view2', ['ui.router', 'infinite-scroll'])

.config(function($stateProvider) {
  $stateProvider.state('view2', {
    url: '/view2',
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
})

.controller('View2Ctrl', function($scope, $http) {
        $scope.variableCtrl2 = 'contenido del la variable 2';
        console.log("controlador 2");

        $scope.list = [1,2,3,4,5,6];

        $scope.addTweets = function() {
            var last = $scope.images[$scope.images.length - 1];
            for(var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };

        //if ($scope.list.length === 0) {
        //    $http({
        //        method: "GET",
        //        url: "http://127.0.0.1:3000/tweets/+"+5
        //    }).then(function (result) {
        //        $scope.list = result.data
        //    })
        //}
        //
        //$scope.addTweets = function () {
        //    $http({
        //        method: "GET",
        //        url: "http://127.0.0.1:3000/tweets/+"+5
        //    }).then(function (result) {
        //        for (var tweet of result) {
        //            $scope.list.push(tweet);
        //        }
        //    })
        //};

});