'use strict';

// Declare app level module which depends on views, and components
angular.module('front', [
    'ui.router'
    ])
    .factory('socket', function ($rootScope) {
        var socket = io('http://45.55.41.25:3000');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args)
                    })
                })
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        }
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