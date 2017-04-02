var editOrdersController = function (localStorageService, $location) {
    var self = this;
    self.allOrders = localStorageService.getOrders();

    self.cancel = function (order, user) {
        var index = self.allOrders[user].indexOf(order);
        if (index !== -1) {
            self.allOrders[user].splice(index, 1);
        }
    };

    self.save = function () {
        for (var key in self.allOrders) {
            for (var i = 0; i < self.allOrders[key].length; i++) {
                self.allOrders[key][i].editing = undefined;
            }
        }
        localStorage.setItem("orders", JSON.stringify(self.allOrders));
        $location.path('home');
    };
};

angular.module('app').controller('controller.editOrders', editOrdersController);