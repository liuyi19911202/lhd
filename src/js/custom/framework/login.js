(function () {
    'use strict';

    angular.module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', '$state', '$localStorage', '$sessionStorage', 'AuthService', 'SysUserService', 'SysMenuService', 'APP_CONST'];
    function LoginCtrl($rootScope, $scope, $state, $localStorage, $sessionStorage, authService, sysUserService, sysMenuService, APP_CONST) {
        $scope.user = {};
        $scope.authError = null;
        $scope.usernameFocus = true;

        $scope.login = function () {
            $scope.authError = null;
            $rootScope.loading = true;

            authService.login($scope.user)
                .then(function (data) {
                    if ($scope.rememberPwd) {
                        //记住密码，没有时间限制的数据存储
                        $localStorage[APP_CONST.STORAGE.AUTH_TOKEN] = data.access_token;
                    }
                    //针对一个session的数据存储（关闭窗口，存储的数据清空）
                    $sessionStorage[APP_CONST.STORAGE.AUTH_TOKEN] = data.access_token;
                    //加载用户信息
                    sysUserService.retrieve()
                        .then(function (data) {
                            $localStorage[APP_CONST.STORAGE.USER] = data;
                            $rootScope.sysuser = data;
                            $state.go('app.dashboard');
                        });
                    //加载导航
                    sysMenuService.nav()
                        .then(function (data) {
                            $localStorage[APP_CONST.STORAGE.MENU] = data;
                            $rootScope.menu = data;
                        });
                })
                .catch(function () {
                    $scope.authError = '登录失败,请重试';
                })
                .finally(function () {
                    $rootScope.loading = false;
                });
        };

    }
})();