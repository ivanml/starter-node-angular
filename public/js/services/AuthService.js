angular.module('AuthService', [])
    .factory('Auth', ['$http', '$cookieStore', '$rootScope', '$timeout', function ($http, $cookieStore, $rootScope) {

        return {

            setCredentials : function(user) {
                //var authdata = user.local.email + ':' + user.local.passWord;

                $rootScope.globals = {
                    isLoggedIn: true,
                    currentUser: {
                        userId: user._id,
                        email: user.local.email
                        //authdata: authdata
                    }
                };

                //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            },

            clearCredentials : function() {
                $rootScope.globals = { isLoggedIn: false };
                $rootScope.billOptions = { isAllBill: false };
                $cookieStore.remove('globals');
                $cookieStore.remove('billOptions');
                //$http.defaults.headers.common.Authorization = 'Basic ';
            },

            login : function(email, passWord, callback) {
                $http.post('/api/login', { email: email, password: passWord })
                    .success(function(data) {
                        var response = { success: true, message: data.status, user: data.user };
                        callback(response);
                    })
                    .error(function(data) {
                        var response = { success: false, message: data.err.message };
                        callback(response);
                    });
            },


            signup : function(email, passWord, callback) {
                $http.post('/api/signup', { email: email, password: passWord })
                    .success(function(data) {
                        var response = { success: true, message: data.status, user: data.user };
                        callback(response);
                    })
                    .error(function(data) {
                        var response = { success: false, message: data.err.message };
                        callback(response);
                    });
            }
        }

    }]);
