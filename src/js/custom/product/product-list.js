(function () {
    'use strict';

    angular.module('app')
        .controller('ProductListCtrl', ProductListCtrl);

    ProductListCtrl.$inject = ['$rootScope', '$scope', 'ProductService', 'DICT_CONST', 'dialogs' , '$state'];
    function ProductListCtrl($rootScope, $scope, productService, DICT_CONST , dialogs ,$state) {

        $scope.title = '商品信息';
        $scope.yes_no = DICT_CONST.YES_NO;
        $scope.params = {
            pageNum: 1,
            pageSize: 20,
            orderBy: ''
        };

        $scope.search = function () {
            $rootScope.loading = true;
            productService.list($scope.params)
                .then(function (data) {
                    $scope.pageInfo = data;
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        };

        $scope.search();

        $scope.pageChanged = function () {
            $scope.params.pageNum = $scope.pageInfo.pageNum;
            $scope.search();
        };

        $scope.delete = function (id) {
            dialogs.confirm('确认', '要删除该商品吗？', {
                size: 'md'
            })
                .result.then(function () {
                productService.deleteById(id)
                    .then(function () {
                        $state.reload();
                    })
                ;
            });
        };
    }
})();