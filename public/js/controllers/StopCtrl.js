'user strict';
ami.controller('StopController', function ($scope, StopService, $routeParams) {
    $scope.tagline = 'Nothing beats a pocket protector!';
    StopService.getStops($routeParams.routenumber, $routeParams.direction).then(
             function (data) {
                 $scope.stoplist = data;
             },
             function (error) {
                 console.log(error)
             });

});