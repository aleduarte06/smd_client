'use strict';

angular.module('myApp.view1', ['ui.router', 'luegg.directives', 'ngAnimate'])
    .config(function($stateProvider) {
        $stateProvider.state('view1', {
            url: '/view1',
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    })
    .controller('View1Ctrl', function($scope, $http, socket) {
        $scope.tweets = [];

        function deleteTweet () {
            if ($scope.tweets.length > 4) {
                $scope.tweets.shift()
            }
        }

        socket.on('tweetFiltered', function (result) {
            if (result) {
                $scope.tweets.push(result);
            }
            deleteTweet()
        });
    });