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
        $scope.variableCtrl2 = 'contenido del la variable 2';
        console.log("controlador 2");

        $scope.list = [1,2,3,4,5,6];

        $scope.addTweets = function() {
            var last = $scope.images[$scope.images.length - 1];
            for(var i = 1; i <= 8; i++) {
                $scope.images.push(last + i);
            }
        };

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
