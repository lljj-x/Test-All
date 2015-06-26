/**
 * Created by Liu.Jun on 2015/5/26.
 */
myTestApp.controller("myTestController", function ($scope) {
    $scope.myData = {
        message : ""
    };

    $scope.save = function () {
        $scope.myData.message = "";
        alert("Save Success !");
    };
    $scope.clear = function(){
        $scope.myData.message = "";
        alert("Clear Success !")
    };

})