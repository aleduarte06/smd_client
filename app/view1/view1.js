'use strict';

angular.module('myApp.view1', ['ui.router', 'luegg.directives', 'ngAnimate'])
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
                url: 'http://127.0.0.1:3000/tweets/filtered/+'+cantidad
            }).then(function (result) {
                cb(result.data)
            }, function (err) {
                console.log(err)
            })
        };

        setInterval(function () {
            $scope.obtainTweets(1, function (data) {
                if (data.length){
                    if ($scope.tweets.length >= 9){
                        var element = document.querySelector('.media-list').firstElementChild;
                            $scope.tweets.splice(0,1);
                            $scope.tweets.push(data[0]);

                    } else {
                        $scope.tweets.push(data[0]);
                    }
                    console.log(data[0].id)

                }
            })
        }, 5000);
    });