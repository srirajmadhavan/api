'user strict';
ami.factory('RouteService', function ($http, $q, $resource) {
    return {
        // call to get all nerds
        getRouteList: function () {
            var deferred = $q.defer();
            $http({ method: 'GET', url: '/api/route/list' }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        },
        getRouteDetails: function (routeid) {
            var deferred = $q.defer();
            $http({ method: 'GET', url: '/api/route/detail?id=' + routeid }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        }
    }
});
