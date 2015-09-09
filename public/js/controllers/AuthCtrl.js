angular.module('AuthCtrl', [])
    .controller('AuthController', ['$scope', '$location', '$window', 'Auth', 'Flash', function ($scope, $location, $window, Auth, Flash) {
/*        $scope.userInfo = null;
        $scope.login = function () {
            console.log('called controller login. ');
            Auth.login($scope.userName, $scope.passWord)
                .then(function (result) {
                    console.log('called service login, successful. ');
                    console.log('ctrl: ' + JSON.stringify(result));
                    $scope.userInfo = result;
                    //$location.path("/");
                }, function (error) {
                    $window.alert("Invalid credentials");
                    console.log(error);
                });
        };*/
        $scope.dataLoading = false;

        (function initController() {
            // reset login status
            Auth.clearCredentials();
        })();

        $scope.login = function() {
            $scope.dataLoading = true;

            Auth.login($scope.email, $scope.passWord, function(response) {
                if (response.success) {
                    Auth.setCredentials($scope.email, $scope.passWord);
                    Flash.Success('Login success!', true);
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
                console.log('Ctrl signup called.');
                if (response.success) {
                    Auth.setCredentials($scope.email, $scope.passWord);
                    Flash.Success('Signup success!', true);
                    $location.path('/');
                } else {
                    Flash.Error(response.message);
                    $scope.dataLoading = false;
                }
            });
        }

    }]);