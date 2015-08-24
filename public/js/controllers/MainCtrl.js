angular.module('MainCtrl', [])
    .controller('MainController', ['$scope', 'Bills', function($scope, Bills) {

    Bills.getPending()
        .success(function(data) {
            $scope.bills = data;
            $scope.pending_bill_num = $scope.bills.length;
            $scope.loading = false;
        });

}]);