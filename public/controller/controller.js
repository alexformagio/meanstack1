/**
 * Created by formagio on 10/02/15.
 */
var myApp = angular.module('myApp',[]);
myApp.controller('AppController',['$scope','$http',function($scope,$http){
 console.log('Hello world from controller');
    $scope.insertStatus = true;

    var updateInArray = function(contact){
        var id = contact._id;
        for(i=0;i<$scope.contactList.length;i++){
            var reg = $scope.contactList[i]._id;
            console.log('updateinArray -> '+ reg +' - '+id);
            if(reg == id) {
                $scope.contactList[i]=contact;
                break;
            }
        }

    }

    var deleteInArray = function(id){
        for(i=0;i<$scope.contactList.length;i++){
            var reg = $scope.contactList[i]._id;
            console.log('deleteinArray -> '+ reg +' - '+id);
            if(reg == id) {
                $scope.contactList.splice(i, 1);
                break;
            }
        }

    }

    $scope.editContact = function(id){
        $scope.insertStatus=false;
        for(i=0;i<$scope.contactList.length;i++){
            var reg = $scope.contactList[i]._id;

            if(reg == id) {
                $scope.contact = $scope.contactList[i];
                break;
            }
        }
    }

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactlist',$scope.contact).success(function(response){
            console.log(response);
            $scope.contactList.push(response);
            $scope.contact = null;
        });
    };

    $http.get('/contactlist').success(function(response){
        console.log('I received de data I requested');
        $scope.contactList = response;
    });

    $scope.removeContact = function(id){
        console.log('step1 -> '+id);

        $http.delete('/contactlist/'+id).success(function(response){
            console.log('confirmed delete -> '+response);
            deleteInArray(id);
            $scope.contact = null;
        });
    }

    $scope.updateContact = function(){
        console.log($scope.contact);
        $http.put('/contactlist',$scope.contact).success(function(response){
            console.log('confirmed update -> '+response);
            updateInArray(response);
            $scope.contact = null;
            $scope.insertStatus = true;
        });
    }


}]);
