(function () {
    'use strict';

    angular.module('app')
        .controller('ProductMagicCtrl', ProductMagicCtrl);

    ProductMagicCtrl.$inject = ['$rootScope', '$scope', 'MagicService', 'DICT_CONST', '$state', 'toaster'];
    function ProductMagicCtrl($rootScope, $scope, magicService, DICT_CONST , $state , toaster) {

        $scope.title = '商品爬虫';
        $scope.params = {};

        $scope.checkStatus = false;

        $scope.search = function () {
            $rootScope.loading = true;
            magicService.reptileTb($scope.params.url)
                .then(function (data) {
                        $scope.product = data;

                    var sku = [];
                    angular.forEach(angular.fromJson(data.sku), function (obj,i) {
                        sku.push(angular.fromJson(obj));
                    });
                    $scope.sku = sku;

                    var impress = [];
                    angular.forEach(angular.fromJson(data.impress), function (obj,i) {
                        var str = angular.fromJson(obj).title + "," + angular.fromJson(obj).count;
                        impress.push(str);
                    });
                    $scope.impress = impress;

                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        };

        $scope.saveData = function () {
            $rootScope.loading = true;

            magicService.saveData($scope.product)
                .then(function (data) {
                    $state.go('app.product.list', {
                        id: data.id
                    });
                    toaster.pop('success', '', '保存成功');
                })
                .finally(function () {
                    $rootScope.loading = false;
                })
            ;
        }

        $scope.myKeyup = function(e){
            var keycode = window.event?e.keyCode:e.which;
            if(keycode==13){
                $scope.search();
            }
        };


        var items = new Array();
        var obj = new Array();
        obj.push("颜色")
        obj.push("黑色")
        obj.push("白色")
        var obj1 = new Array();
        obj1.push("尺码")
        obj1.push("X")
        obj1.push("L")
        obj1.push("LL")
        obj1.push("MM")

        items.push(obj1);
        items.push(obj);
        $scope.items = items;

        //表头
        var hreads = new Array();
        items.forEach(function (val, index) {
            val.forEach(function (val1, index1) {
                if(index1 == 0){
                    hreads.push(val1);
                }
            });
        });
        hreads.push("价格");
        hreads.push("库存");
        $scope.skuTableheads = hreads;

        //将数据分开
        var allitems = new Array();
        items[0].forEach(function (val, index) {
            var item = new Array();
            if(index != 0){
                item.push(val);

                var item1 = new Array();
                items[1].forEach(function (val1 , index1){
                    if(index1  != 0){
                        item1.push(val1);
                    }
                });
                item.push(item1);
                allitems.push(item);
            }
        });

        console.log(allitems)
        $scope.skuClick = function(value,ischeck){
            $("#skuTable tbody").html("");
            allitems.forEach(function (val , index) {
                val[1].forEach(function (val1 , index1) {
                    var proprice = "<input id = 'proPrice' type = 'text' onkeyup=\"value=value.replace(/[^\\d]/g,'')\">";
                    var procount = "<input id = 'proCount' type = 'text' onkeyup=\"value=value.replace(/[^\\d]/g,'')\";>";
                    $("#skuTable tbody").append('<tr class="text-center"><td>' + val[0] + '</td><td>' + val1 + '</td><td>' + proprice + '</td><td>' + procount + '</td></tr>');
                });
            });

            $("#skuTable tbody").rowspan(0);
        };

        //下标从0开始
        jQuery.fn.rowspan = function (colIdx) {
            return this.each(function () {
                var that;
                $('tr', this).each(function (row) {
                    $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                        if (that != null && $(this).html() == $(that).html()) {
                            var rowspan = $(that).attr("rowSpan");
                            if (rowspan == undefined) {
                                $(that).attr("rowSpan", 1);
                                rowspan = $(that).attr("rowSpan");
                            }
                            rowspan = Number(rowspan) + 1;
                            $(that).attr("rowSpan", rowspan);
                            $(this).hide();
                        } else {
                            that = this;
                        }
                    });
                });
            });
        }
    }
})();