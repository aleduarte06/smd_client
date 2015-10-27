'use strict';

angular.module('myApp.view2', ['ui.router','ui.bootstrap'])
.config(function($stateProvider) {
  $stateProvider.state('view2', {
    url: '/view2',
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
})
.controller('View2Ctrl', function($scope, $http) {
        $scope.tweets = [];
        $scope.tweetsFiltered = [];

        $scope.isTweetCapture = false;
        $scope.filterTweet = function (tweet) {
            $http.post('http://127.0.0.1:3000/tweets/filtered/', tweet)
                .then(function (response) {
                    $scope.tweetsFiltered.push(tweet)
                })
                .catch(function (response) {
                    createNotification('Error al filtrar el tweet', null)
                });

        };

        var createNotification = function (title, text) {
            jQuery.gritter.add({
                title: title,
                text: text
            })
        };

        $scope.tweetCapture = function () {
            if (!$scope.isTweetCapture) {
                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:3000/empezar'
                }).then(function (response) {
                    $scope.isTweetCapture = true;
                    createNotification('Capturando Tweets', response.data.message)
                }, function (response) {
                    createNotification('Error Capturando Tweets', response.data.message)
                })
            } else {
                $http({
                    method: 'GET',
                    url: 'http://127.0.0.1:3000/terminar'
                }).then(function (response) {
                    $scope.isTweetCapture = false;
                    createNotification('Captura Finalizada', response.data.message)
                }, function (response) {
                    createNotification('Error Finalizando la Captura', response.data.message)
                })
            }
        };

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
                if (data.length){
                    if ($scope.tweets.length >= 9){
                        $scope.tweets.splice(0,1);
                        $scope.tweets.push(data[0]);
                    } else {
                        $scope.tweets.push(data[0]);
                    }
                }
            })
        }, 5000);
})
.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'view2/modal-config.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            windowClass:'modal-message',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
