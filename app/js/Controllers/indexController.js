var indexController = function (loginService) {
    var self = this;
    
    self.logout = function () {
        loginService.logout();
    };
};

angular.module('app').controller('controller.index', indexController);