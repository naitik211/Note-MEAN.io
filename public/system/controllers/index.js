/**
 * Created by Naitik Soni on 06/06/14.
 */
'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);