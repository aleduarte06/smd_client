'use strict';

angular.module('myApp.view1', ['ui.router', 'luegg.directives'])

    .config(function($stateProvider) {
        $stateProvider.state('view1', {
            url: '/view1',
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    })

    .controller('View1Ctrl', function($scope, $http) {
        $scope.tweets = [];

        $scope.obtainTweets = function (cantidad, cb) {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:3000/tweets/+'+cantidad
            }).then(function (result) {
                cb(result.data)
            }, function (err) {
                console.log(err)
            })
        };

        setInterval(function () {
            $scope.obtainTweets(1, function (data) {
                $scope.tweets.push(data[0])
            })
        }, 1000);

        if ($scope.tweets.length === 0 ) {
            $scope.obtainTweets(4, function (data) {
                $scope.tweets = data
            });
        }
    });