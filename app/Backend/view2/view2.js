'use strict';

angular.module('myApp.view2', ['ui.router','ui.bootstrap'])

.controller('View2Ctrl', function($scope, $http, socket) {
        $scope.tweets = [];
        $scope.asd = function () {socket.emit('asd')};
        $scope.tweetsFiltered = [];
        $scope.isTweetCapture = false;
        $scope.isTweetShow = false;
        $scope.tweetShow = function () {
            if ($scope.isTweetShow) {
                socket.emit('tweetStop');
                $scope.isTweetShow = false
            } else {
                socket.emit('tweetShow', function () {
                    console.log('error')
                });
                $scope.isTweetShow = true
            }
        };

        $scope.isTweetFilteredShow = false;
        $scope.tweetFilteredShow = function () {
            if ($scope.isTweetFilteredShow) {
                socket.emit('tweetFilteredStop');
                $scope.isTweetFilteredShow = false
            } else {
                socket.emit('tweetFilteredShow');
                $scope.isTweetFilteredShow = true
            }

        };
        $scope.tweetCapture = function () {
            if (!$scope.isTweetCapture) {
                $http({
                    method: 'GET',
                    url: 'http://45.55.41.25:3000/empezar'
                }).then(function (response) {
                    $scope.isTweetCapture = true;
                    createNotification('Capturando Tweets', response.data.message)
                }, function (response) {
                    createNotification('Error Capturando Tweets', response.data.message)
                })
            } else {
                $http({
                    method: 'GET',
                    url: 'http://45.55.41.25:3000/terminar'
                }).then(function (response) {
                    $scope.isTweetCapture = false;
                    createNotification('Captura Finalizada', response.data.message)
                }, function (response) {
                    createNotification('Error Finalizando la Captura', response.data.message)
                })
            }
        };

        $scope.filterTweet = function (tweet) {
            $http.post('http://45.55.41.25:3000/tweets/filtered/', tweet)
                .then(function (response) {
                    if(response.data.data.inserted){
                        $scope.tweetsFiltered.push(tweet)
                    }
                })
                .catch(function (response) {
                    createNotification('Error al filtrar el tweet', response.data.message)
                });

        };

        socket.on('tweet', onTweetReceive);

        function onTweetReceive(data){
            if (data) {
                $scope.tweets.push(data)
            }
            deleteTweet()
        }

        function deleteTweet () {
            if ($scope.tweets.length > 100) {
                $scope.tweets.shift()
            }
        }

        var createNotification = function (title, text) {
            jQuery.gritter.add({
                title: title,
                text: text
            })
        };

})
.controller('ModalDemoCtrl', function ($scope, $uibModal, $log, $http) {
    $scope.animationsEnabled = true;
    $scope.config = {};

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/modal-config.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            windowClass:'modal-message',
            resolve: {
                config: function () {
                    return $scope.config;
                }
            }
        });

        modalInstance.result.then(function (config) {
            $scope.config = config;
            $http.post('http://45.55.41.25:3000/config', config)
                .then(function (response) {
                    jQuery.gritter.add({
                        title: 'asd',
                        text: response.data.message
                    })
                }, function errorCallback(response) {
                    console.log(response)
                })
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, config) {
    $scope.config = config;

    $scope.ok = function () {
        $uibModalInstance.close($scope.config);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
