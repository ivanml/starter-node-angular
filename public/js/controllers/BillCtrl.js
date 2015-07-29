angular.module('BillCtrl', [])
    .controller('BillController', ['$scope', '$http', 'Bills', function($scope, $http, Bills) {

    Bills.get()
        .success(function(data) {
            $scope.bills = data;
        });
        
}]);