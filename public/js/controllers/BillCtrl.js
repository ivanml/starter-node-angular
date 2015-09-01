angular.module('BillCtrl', [])
    .controller('BillController', ['$scope', '$http', 'Bills', function($scope, $http, Bills) {

        $scope.formData = {};
        $scope.loading = true;
        $scope.isAnyRowHovered = false;

        var currentBillId = "";
        var showAllBill = false;

        // used for maintaining checkbox states
        $scope.CONFIG = localStorage.getItem('CONFIG');
        if (!$scope.CONFIG) {
            $scope.CONFIG = {isAllBill : false};
        }

        // initialize as getting pending bills
        Bills.getPending()
            .success(function(data) {
                $scope.bills = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error in getting Pending bills: ' + data);
            });

        // function call after checkbox click
        $scope.allBillToggle = function(checked) {
            $scope.CONFIG.isAllBill = checked;
            localStorage.setItem('CONFIG', $scope.CONFIG);

            if (checked) {
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
        }

        $scope.recordBillId = function(id) {
            currentBillId = id;
        };

        $scope.trimDate = function(date) {
            var arr = date.split('T');
            return arr[0];
        };

        // when submitting the add form, send the text to the node API
        $scope.createBills = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.amount != undefined &&
                $scope.formData.description != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                var postData = {
                    submitForm: $scope.formData,
                    isAllBillChecked: showAllBill
                };
                Bills.create(postData)
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

        // delete a bill, permanently from database
        $scope.deleteFromModal = function() {
            Bills.delete(currentBillId, {isAllBillChecked: showAllBill})
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in deleting bill: ' + data);
                });
        };
        
        // archive or unarchive a bill
        $scope.toggleArchive = function(billId, isPending) {
            var putData = {
                billStatus: isPending,
                isAllBillChecked: showAllBill
            };
            Bills.toggleFinish(billId, putData)
                .success(function(data) {
                    $scope.bills = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error in archiving/unarchiving bill: ' + data);
                });
        };

        // hover control
        $scope.hoverRow = function(bill) {
            $scope.isAnyRowHovered = !$scope.isAnyRowHovered;
            return bill.isHovered = ! bill.isHovered;
        };

    }]);