/**
 *
 * Created by Liu.Jun on 2015/5/22.
 */

FormApp.controller("myForm", function ($scope) {
    $scope.master = {
        firstName: "John",
        lastName: "Doe"
    };

    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    }
    $scope.reset();
    
});