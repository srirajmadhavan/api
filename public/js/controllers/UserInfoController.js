'user strict';
ami.controller('UserInfoController', function ($scope, RouteService, UserService, localStorageService) {

    $scope.tagline = 'To the moon and back!';
    var user = localStorageService.get('user');
    if (user)
    {
        $scope.showemail = false;
        $scope.showgetname = false;
        $scope.showjump = true;
        $scope.name = user.name;
        $scope.email = user.email;
        $scope.route = user.route;
    }
    else
    {
        $scope.showemail = true;
        $scope.showgetname = false;
        $scope.showjump = false;
    }
    $scope.submit = function () {
        user = { email: $scope.email, name: $scope.name, route: 0 };
        UserService.getUser(user).then(
            function (data) {
                if (data != undefined && data != null) {
                    user = data;
                    $scope.email = data.email;
                    $scope.name = data.name;
                    $scope.showemail = false;
                    $scope.showjump = true;
                    localStorageService.set('user', user);
                }
                else {
                    $scope.callyou = 'what shall we call you..'
                    $scope.showemail = false;
                    $scope.showgetname = true;
                }
            },
           function (error) {
               console.log(error)
           }
            );
    }
});