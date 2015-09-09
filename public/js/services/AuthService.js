angular.module('AuthService', [])
    .factory('Auth', ['$http', '$cookieStore', '$rootScope', '$timeout', function ($http, $cookieStore, $rootScope) {

        return {

            setCredentials : function(email, passWord) {
                var authdata = email + ':' + passWord;

                $rootScope.globals = {
                    currentUser: {
                        isLoggedIn: true,
                        email: email,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            },

            clearCredentials : function() {
                $rootScope.globals = { isLoggedIn: false };
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            },

            login : function(email, passWord, callback) {
                $http.post('/api/login', { email: email, password: passWord })
                    .success(function(data) {
                        var response = { success: true };
                        callback(response);
                    })
                    .error(function(data) {
                        var response = { success: false, message: data.err.message };
                        callback(response);
                    });
            },


            signup : function(email, passWord, callback) {
                console.log('Service signup called.');
                $http.post('/api/signup', { email: email, password: passWord })
                    .success(function(data) {
                        var response = { success: true };
                        callback(response);
                    })
                    .error(function(data) {
                        var response = { success: false, message: data.err.message };
                        callback(response);
                    });
            }
        }

    }]);
