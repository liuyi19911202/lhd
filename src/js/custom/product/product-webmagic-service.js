(function () {
    'use strict';

    angular.module('app')
        .service('MagicService', MagicService);

    MagicService.$inject = ['$http', '$q', 'APP_CONST'];
    function MagicService($http, $q, APP_CONST) {

        this.reptileTb = function getReptileByTb(url) {
            var d = $q.defer();

            $http.get(APP_CONST.PROPERTY.API_URL + '/product/reptile/',{
                    params: {url:url}
                 })
                .success(function (data) {
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });

            return d.promise;
        };

        this.saveData = function saveData(data) {
            var d = $q.defer();

            $http.post(APP_CONST.PROPERTY.API_URL + '/product', data)
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