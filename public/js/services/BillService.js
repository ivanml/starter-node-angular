angular.module('BillService', [])
    .factory('Bills', ['$http', function($http) {
        return {
			get : function() {
				return $http.get('/api/bills');
			}
		}
}]);