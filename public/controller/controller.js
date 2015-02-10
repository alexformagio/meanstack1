/**
 * Created by formagio on 10/02/15.
 */
var myApp = angular.module('myApp',[]);
myApp.controller('AppController',['$scope','$http',function($scope,$http){
 console.log('Hello world from controller');

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response){
            console.log(response);
        });
    };

    $http.get('/contactlist').success(function(response){
        console.log('I received de data I requested');
        $scope.contactList = response;
    });

}]);
