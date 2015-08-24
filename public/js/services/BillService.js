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

			// call to DELETE a bill
			delete : function(id) {
				return $http.delete('/api/bills/' + id);
			},

            // update db
            finish : function(id) {
                return $http.delete('/api/bills/finish_bill/' + id);
            },

            // update db
            unfinish : function(id) {
                return $http.delete('/api/bills/unfinish_bill/' + id);
            }

		}
}]);