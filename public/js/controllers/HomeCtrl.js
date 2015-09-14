angular.module('HomeCtrl', [])
    .controller('HomeController', ['$scope', '$rootScope', 'Bills', function($scope, $rootScope, Bills) {
        $scope.loading = true;

        if ($rootScope.globals.isLoggedIn) {
            Bills.getPending({ userId : $rootScope.globals.currentUser.userId })
                .success(function(data) {
                    $scope.bills = data;
                    $scope.pending_bill_num = $scope.bills.length;
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log('Error in getting Pending bills: ' + data);
                });
        } else {
            $scope.loading = false;
        }

}]);