angular.module('NerdCtrl', [])
    .controller('NerdController', ['$scope', '$http', 'Nerds', function($scope, $http, Nerds) {

    Nerds.get()
        .success(function(data) {
            $scope.nerds = data;
        });
        
}]);