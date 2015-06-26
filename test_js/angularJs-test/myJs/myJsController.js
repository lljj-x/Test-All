/**
 * Created by Liu.Jun on 2015/5/21.
 */

function personController($scope){
    $scope.person = {
        firstName : "Liu",
        lastName : "Jun"
    };
}

function namesController($scope){
    $scope.names = [
        {
            firstName : "Liu",
            lastName : "Jun"
        },
        {
            firstName : "Xiao",
            lastName : "Ming"
        },
        {
            firstName : "Xiao",
            lastNam : "Lee"
        }
    ]
}