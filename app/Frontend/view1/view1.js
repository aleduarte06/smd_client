'use strict';

angular.module('myApp.view1', ['ui.router', 'luegg.directives', 'ngAnimate'])
    .config(function($stateProvider) {
        $stateProvider.state('view1', {
            url: '/view1',
            templateUrl: '/view1.html',
            controller: 'View1Ctrl'
        });
    })
    .controller('View1Ctrl', function($scope, $http, socket) {
        $scope.tweets = [];

        function deleteTweet (num) {
            if ($scope.tweets.length > num) {
                $scope.tweets.shift()
            }
        }

        socket.on('tweetFiltered', function (result) {
            console.log(result);
            if (result) {
                $scope.tweets.push(result);
                deleteTweet(8)
            } else {
                deleteTweet(4)
            }
        });
    });