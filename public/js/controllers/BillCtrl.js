angular.module('BillCtrl', [])
    .controller('BillController', ['$scope', '$http', 'Bills', function($scope, $http, Bills) {

        $scope.formData = {};
        $scope.loading = true;

        Bills.get()
            .success(function(data) {
                $scope.bills = data;
                $scope.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createBills = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.amount != undefined ||
                $scope.formData.description != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Bills.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.bills = data; // assign our new list of todos
                    });
            } else {
                console.log("form data is incomplete: " + $scope.formData);
            }
        };

    }]);