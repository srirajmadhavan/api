'user strict';
ami.controller('BusRouteListController', function ($scope, RouteService, localStorageService) {
    $scope.tagline = 'The square root of life is pi!';
    var routelist = localStorageService.get('routelist');
    if (routelist != null && routelist.length > 0) {
        $scope.routelist = routelist;
    }
    else {
        RouteService.getRouteList().then(
              function (data) {
                  if (localStorageService.isSupported) {
                      localStorageService.set('routelist', data);
                  }
                  $scope.routelist = data;
              },
              function (error) {
                  console.log(error)
              }
              );
    }
});