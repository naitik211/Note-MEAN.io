'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

            // states for my app
            $stateProvider              
                .state('login', {
                    url: '/',
                    templateUrl: 'public/system/views/login.html'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'public/system/views/register.html'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'public/system/views/index.html'
                })
                .state('addNote', {
                    url: '/addNote',
                    templateUrl: 'public/system/views/addNote.html'
                })

        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
