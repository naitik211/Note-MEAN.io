/**
 * this factory to communicate between backend services and client side user interface
 */

angular.module('mean.system').factory('noteFactory', function($resource) {
        return{
            note:$resource('/note',{},{
                query:{
                    method:'GET',
                    isArray:true
                },
                create:{
                    method:'POST'
                },
                put:{
                    method:'PUT'
                }
            }),
            registration: $resource('/registration', {}, {
                create: {
                    method: 'POST'
                },
                query: {
                    method: 'GET',
                    isArray: true
                }
            }),
            signin: $resource('/login', {}, {
                create: {
                    method: 'POST',
                    isArray: true
                },
                query: {
                    method: 'GET',
                    isArray: true
                }
            })
        }
    }
);