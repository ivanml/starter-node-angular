angular.module('BillService', [])
    .factory('Bills', ['$http', function($http) {
        return {
			// get data from db
			get : function() {
				return $http.get('/api/bills');
			},

			// call to POST and create a new bill record
			create : function(billData) {
				return $http.post('/api/bills', billData);
			}

		}
}]);