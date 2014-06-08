

'use strict';

// Note.js is for Add, Edit and Delete Note using different  controllers and methods
// Created By Naitik Soni

//noteController Controller is for Adding Note
angular.module('mean.system').controller('noteController',
    function($scope, $rootScope, $timeout, Global, Menus,noteFactory) {
        $scope.addNotSuccess = false;
        $('#note').focus();
        //Add Function will execute when add button will clicked
        //it will persist entered Expression or text
        $scope.add = function (){
            noteFactory.note.create({note:$scope.note}).$promise.then(function(result){
                $scope.note='';
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
                noteFactory.note.put({id:$scope.editData.list._id,newNote:$scope.newNote}).$promise.then(function(result){
                    $state.go('home',{},{reload:true});
                })
            }
            else{
                $scope.editPanel = true;
                $scope.editData = note;
                $scope.newNote = note.list.note;
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
    }
);
