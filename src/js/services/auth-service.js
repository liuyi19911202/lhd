(function () {
    'use strict';

    //自定义服务
    angular.module('app')
        .service('AuthService', AuthService);

    //注册服务
    AuthService.$inject = ['$http', '$q', 'APP_CONST'];

    //将参数传递的方式改成form
    var postCfg = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (data) {
            return $.param(data);
        }
    };

    function AuthService($http, $q, APP_CONST) {

        this.login = function (credentials) {
            var d = $q.defer();
            //$http.POST方法默认提交数据的类型为application/json
            $http.post(APP_CONST.PROPERTY.API_URL + '/auth/token', {
                loginName: credentials.username,
                password: credentials.password
            })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.refresh = function () {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/auth/refresh')
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.logout = function () {
            var d = $q.defer();

            $http.delete(APP_CONST.PROPERTY.API_URL + '/auth/token', null)
                .success(function () {

                    d.resolve();
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };
    }
})();