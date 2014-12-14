'user strict';
ami.factory('UserService', function ($http, $q, $resource) {
    return {
        // call to get all nerds
        getUser: function (user) {
            var deferred = $q.defer();
            debugger;
            $http({ method: 'GET', url: '/api/user/userfromemail?email=' + user.email + '&name=' + user.name }).
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
