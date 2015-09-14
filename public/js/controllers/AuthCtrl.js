angular.module('AuthCtrl', [])
    .controller('AuthController', ['$scope', '$location', '$window', 'Auth', 'Flash', function ($scope, $location, $window, Auth, Flash) {
        $scope.dataLoading = false;

        (function initController() {
            // reset login status
            Auth.clearCredentials();
        })();

        $scope.login = function() {
            $scope.dataLoading = true;

            Auth.login($scope.email, $scope.passWord, function(response) {
                if (response.success) {
                    Auth.setCredentials(response.user);
                    Flash.Success(response.message, true);
                    $location.path('/');
                } else {
                    Flash.Error(response.message);
                    $scope.dataLoading = false;
                }
            });
        };


        $scope.signup = function() {
            $scope.dataLoading = true;

            Auth.signup($scope.email, $scope.passWord, function(response) {
                if (response.success) {
                    Auth.setCredentials(response.user);
                    Flash.Success(response.message, true);
                    $location.path('/');
                } else {
                    Flash.Error(response.message);
                    $scope.dataLoading = false;
                }
            });
        }

    }]);