(function () {
    'use strict';

    angular.module('app')
        .controller('ProductFormCtrl', ProductFormCtrl);

    ProductFormCtrl.$inject = ['$rootScope', '$scope', '$state', 'ProductService'];
    function ProductFormCtrl($rootScope, $scope, $state, productService) {

        var id = $state.params.id;

        $scope.title = '商品详情';
        $rootScope.loading = true;
        productService.getById(id)
            .then(function (data) {
                $scope.data = data;
            })
            .finally(function () {
                $rootScope.loading = false;
            })
        ;

    }
})();