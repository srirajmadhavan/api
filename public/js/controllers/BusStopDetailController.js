'user strict';
ami.controller('BusStopDetailController', function ($scope, StopService, $routeParams) {
    $scope.tagline = 'Nothing beats a pocket protector!';
    //update();
    //function update() {
    //    StopService.getStopDetails($routeParams.stopid, $routeParams.route, $routeParams.direction).then(
    //        function (data) {
    //            if (data.result.length > 0) {
    //                $scope.etas = data.result;
    //                $scope.showlist = true;
    //            }
    //            else {
    //                $scope.message = data.message;
    //                $scope.showlist = false;
    //            }
    //            var updates = $interval(update, 30000);
    //        },
    //        function (error) {
    //            console.log(error)
    //        });
    //}

    StopService.getStopDetailsPolling($routeParams.stopid, $routeParams.route, $routeParams.direction).promise.then(
       null, null, function (data) {
           if (data.result.length > 0) {
               $scope.etas = data.result;
               $scope.showlist = true;
           }
           else {
               $scope.message = data.message;
               $scope.showlist = false;
           }

       }
    );
});