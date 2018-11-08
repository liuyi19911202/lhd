'use strict';

angular.module('app')
    .constant('APP_CONST', {
        PROPERTY: {
            API_URL: 'http://localhost:8080',
            TOKEN_HEADER : 'Authorization'
        },
        STORAGE: {
            USER: 'user',
            MENU: 'menu',
            AUTH_TOKEN: 'authToken'
        }
    })
    .constant('DICT_CONST', {
        YES_NO: [{
            key: true,
            value: '是'
        }, {
            key: false,
            value: '否'
        }],
        GENDER: [{
            key: '0',
            value: '未知'
        }, {
            key: '1',
            value: '男'
        }, {
            key: '2',
            value: '女'
        }]
    })
;