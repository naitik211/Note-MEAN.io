/**
 * Created by naitik on 22/08/14.
 */
'use strict';

angular.module('mean.system').controller('loginCtrl',
    function($scope, $rootScope, $timeout, $window, Global, Menus,noteFactory) {

        $scope.login = function(){
            noteFactory.signin.create({userName:$scope.userName,password:$scope.password}).$promise.then(function(result){
               if(result[0]){
                   localStorage.username = result[0].userName;
                   $window.location.href = '#!/home'
               } else {
                   $scope.authFail = true;
                   $timeout(function(){$scope.addSuccess = false}, 2000);
               }
            });

        }
    });
