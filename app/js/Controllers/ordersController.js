var ordersController = function (localStorageService, loginService) {
    var self = this;
    var allOrders = localStorageService.getOrders();
    self.orders = allOrders[loginService.getIngelogdeUser().naam];
    
    self.cancel = function (order) {
        var index = self.orders.indexOf(order);
        if (index !== -1) {
            self.orders.splice(index, 1);
        }
        allOrders[loginService.getIngelogdeUser().naam] = self.orders;
        localStorage.setItem("orders", JSON.stringify(allOrders));
    };
};

angular.module('app').controller('controller.orders', ordersController);