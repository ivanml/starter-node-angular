angular.module('BillService', [])
    .factory('Bills', ['$http', function($http) {
        return {
			// get data from db
			getAll : function(billData) {
				return $http.post('/api/all_bills', billData);
			},

			getPending : function(billData) {
                return $http.post('/api/pending_bills', billData);
            },

			// call to POST and create a new bill record
			create : function(billData) {
				return $http.post('/api/bills', billData);
			},

			// call to PUT but actually deletes a bill
			delete : function(bill_id, billData) {
				return $http.put('/api/bills/delete/' + bill_id, billData);
			},

			// call to PUT and update a bill's status
            toggleFinish : function(bill_id, billData) {
                return $http.put('/api/bills/toggle/' + bill_id, billData);
            }
		}
	}]);