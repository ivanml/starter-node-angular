angular.module('BillCtrl', [])
    .controller('BillController', ['$scope', '$http', 'Bills', function($scope, $http, Bills) {

        $scope.formData = {};
        $scope.loading = true;

        var currentBillId = "";
        var showAllBill = false;

        Bills.getPending()
            .success(function(data) {
                $scope.bills = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error in getting Pending bills: ' + data);
            });

        $scope.recordBillId = function(id) {
            currentBillId = id;
        };

        $scope.trimDate = function(date) {
            var arr = date.split('T');
            return arr[0];
        };

        $scope.deleteFromModal = function() {
            Bills.delete(currentBillId)
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in deleting bill: ' + data);
                });
        };

        $scope.isAllBill = function () {
            return showAllBill;
        };

        $scope.recordAndShowBill = function() {
            if ($scope.formData.allBillCheck == true) {
                showAllBill = true;
                Bills.getAll()
                    .success(function(data) {
                        $scope.bills = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error in getting all bills: ' + data);
                    });
            } else {
                showAllBill = false;
                Bills.getPending()
                    .success(function(data) {
                        $scope.bills = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error in getting Pending bills: ' + data);
                    });
            }
        };

        $scope.showPendingBills = function() {
            Bills.getPending()
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in getting Pending bills: ' + data);
                });
        };

        // when submitting the add form, send the text to the node API
        $scope.createBills = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.amount != undefined &&
                $scope.formData.description != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Bills.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.bills = data; // assign our new list of bills
                    });
            } else {
                alert("You need to provide both amount and description. ")
                console.log("form data is incomplete: " + $scope.formData);
            }
        };

        // delete a bill after checking it
        $scope.deleteBill = function(id) {
            Bills.delete(id)
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in deleting bill: ' + data);
                });
        };

        // mark the bill as finish, set pending to false
        $scope.finishBill = function(id) {
            Bills.finish(id)
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                   console.log('Error in archiving bill: ' + data);
                });
        };

        // mark the bill as unfinish, set pending to false
        $scope.unfinishBill = function(id) {
            Bills.unfinish(id)
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in unarchiving bill: ' + data);
                });
        };

    }]);