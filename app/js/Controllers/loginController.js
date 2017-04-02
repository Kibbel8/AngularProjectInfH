var loginController = function (loginService) {
    var self = this;

    self.login = function () {
        var authenticated = loginService.authenticateUser(self.login);
        if (authenticated) {
            self.message = "je bent ingelogd";
        } else {
            self.message = "inlog niet succesvol";
        }
    };
};

angular.module('app').controller('controller.login', loginController);