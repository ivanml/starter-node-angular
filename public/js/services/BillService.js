angular.module('BillService', [])
    .factory('Bills', ['$http', function($http) {
        return {
			// get data from db
			getAll : function() {
				return $http.get('/api/all_bills');
			},

			getPending : function() {
                return $http.get('/api/pending_bills');
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