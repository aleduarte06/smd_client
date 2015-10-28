'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'myApp.view1',
    'myApp.view2',
    'myApp.config'
])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/view1');
    })
    .factory('socket', function ($rootScope) {
        var socket = io('http://localhost:3000');
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
    });
