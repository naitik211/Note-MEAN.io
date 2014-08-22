

'use strict';

// Note.js is for Add, Edit and Delete  using different  controllers and methods
// Created By Naitik Soni

angular.module('mean.system').controller('registerCtrl',
    function($scope, $rootScope, $timeout, $window,Global, Menus, noteFactory) {
        $scope.signup = function(){
            noteFactory.registration.create({userName:$scope.name,password:$scope.password}).$promise.then(function(result){
                $scope.name='';
                $scope.password='';
                if(result.result){
                    $scope.addSuccess = true;
                    $timeout(function(){
                        $scope.addSuccess = false
                        $window.location.href  = '/';
                    }, 2000);

                };
            })
        }
    });



//noteController Controller is for Adding Note
angular.module('mean.system').controller('noteController',
    function($scope, $rootScope, $timeout, Global, Menus,noteFactory) {

        $scope.addNotSuccess = false;
        $('#note').focus();
        //Add Function will execute when add button will clicked
        //it will persist entered Expression or text
        $scope.add = function (){
            noteFactory.note.create({Client_Name : $scope.cn,
                Company_Name: $scope.cmp,
                Phone_Number: $scope.pn,
                Email_Address: $scope.email,
                Address: $scope.ad,
                City: $scope.city,
                State: $scope.State,
                Country: $scope.Country,
                Postal_Code: $scope.pc}).$promise.then(function(result){
                $scope.cn='';$scope.cmp='';$scope.pn='';$scope.email='';$scope.ad='';$scope.city='';$scope.State='';$scope.Country='';$scope.pc='';
                $('#note').focus();
                if(result.result){
                    $scope.addNotSuccess = true;
                    $timeout(function(){$scope.addNotSuccess = false}, 2000);
                };
            })
        };
    }
);

//Second controller is for List of Notes,  Edit and delete Note
angular.module('mean.system').controller('listNoteController',
    function($scope, $rootScope, $timeout, $state, $window, noteFactory, $filter, ngTableParams) {
        //all scope variable for show notofications on success or failure
        $scope.editPanel = false;
        $scope.editSuccess = false;
        $scope.deleteSuccess = false;
        $scope.listZero = false;
        if(localStorage.username === undefined){
            $window.location.href = '/';
        }
//        develop branch update
        //to get list of note from database from note factory query method
        var noteList;

        noteList = function() {
            return noteFactory.note.query().$promise.then(function(data) {
                if(data.length == 0){
                    $scope.listZero = true;
                    $scope.tableHide = true;
                }
                $scope.result = data;
                $scope.dataTableNotes = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.result.length,
                    getData: function($defer, params) {
                        var filteredData, orderedData;
                        filteredData = (params.filter() ? $filter("filter")($scope.result, params.filter()) : data);
                        orderedData = (params.sorting() ? $filter("orderBy")(filteredData, params.orderBy()) : data);
                        params.total(orderedData.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };
        noteList();

        //for edit the note and persist it
        //updated data it will show in table
        $scope.editNote = function(note,index){
            if(note === void 0){
                noteFactory.note.put({id:$scope.editData.list._id,
                    cn:$scope.cn,
                    cmp: $scope.cmp,
                    pn: $scope.pn,
                    email: $scope.email,
                    ad:$scope.ad,
                    city:$scope.city,
                    state: $scope.State,
                    country: $scope.Country,
                    pc : $scope.pc
                }).$promise.then(function(result){
                    $state.go('home',{},{reload:true});
                })
            }
            else{
                $scope.editPanel = true;
                $scope.editData = note;
                $scope.cn = note.list.Client_Name;
                $scope.cmp = note.list.Company_Name;
                $scope.pn = note.list.Phone_Number.toString();
                $scope.email = note.list.Email_Address;
                $scope.ad = note.list.Address;
                $scope.city = note.list.City;
                $scope.State = note.list.State ;
                $scope.Country = note.list.Country;
                $scope.pc = note.list.Postal_Code;
            }
        }

        //for delete the note and remove it
        //immidiatly it will update table
        $scope.delete = function(data, index){
            if (confirm('Are you sure you want to delete this Note ? It will not be recover.') === true) {
                noteFactory.note.delete({id:data.list._id}).$promise.then(function(result){
                    $scope.result.splice(index, 1)
                    $scope.dataTableNotes.reload();
                    noteList();
                    $scope.deleteSuccess = true;
                    $timeout(function(){$scope.deleteSuccess = false}, 2000);
                });
            }
        }

        //logout functionality
        $scope.logout = function(){
            localStorage.clear();
            $window.location.href='/';
        }
    }
);
