(function () {
    'use strict';

    angular.module('app')
        .service('ProductService', ProductService);

    ProductService.$inject = ['$http', '$q', 'APP_CONST'];
    function ProductService($http, $q, APP_CONST) {

        this.list = function list(params) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/product/list', {
                params: params
            })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.getById = function getById(id) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/product/' + id)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.deleteById = function deleteById(id) {
            var d = $q.defer();

            $http.delete(APP_CONST.PROPERTY.API_URL + '/product/' + id)
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

    }
})();