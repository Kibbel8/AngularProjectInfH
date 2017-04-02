app.factory("loginService", ['$rootScope', function ($rootScope) {
    var self = this;
    self.user = {
        naam: "defaultUser",
        email: "",
        password: ""
    };

    var getIngelogdeUser = function () {
        return self.user;
    };

    var authenticateUser = function (userInfo) {
        if (userInfo.naam && userInfo.password) {
            self.user = userInfo;
            $rootScope.isAuthenticated = true;
            return true;
        }
        return false;
    };

    var logout = function (userInfo) {
        $rootScope.isAuthenticated = false;
        self.user = {
            naam: "defaultUser",
            email: "",
            password: ""
        };
    };

    return {
        getIngelogdeUser: getIngelogdeUser,
        authenticateUser: authenticateUser,
        logout: logout
    };

}]);