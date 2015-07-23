angular.module('NerdService', [])
    .factory('Nerds', ['$http', function($http) {
        return {
			get : function() {
				return $http.get('/api/nerds');
			},
			create : function(todoData) {
				return $http.post('/api/nerds', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/nerds/' + id);
			}
		}
}]);