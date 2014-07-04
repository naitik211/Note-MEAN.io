/**
 * this factory to communicate between backend services and client side user interface
 * Created by Naitik Soni on 06/06/14.
 * task given by Suma Soft Assignment team
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
            })
        }
    }
);