'user strict';
ami.factory('StopService', function ($http, $q, $resource) {
    return {
        getStops: function (routeNumber, direction) {
            var deferred = $q.defer();
            $http({ method: 'GET', url: '/api/route/stops?route=' + routeNumber + '&direction=' + direction }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
        },
        getStopDetails: function (stopid, routenumber, direction) {
            var deferred = $q.defer();
            $http({ method: 'GET', url: '/api/route/direction/stop/detail?stopid=' + stopid + '&route=' + routenumber + '&direction=' + direction }).
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