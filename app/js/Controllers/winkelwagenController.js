var winkelwagenController = function (localStorageService, $location, loginService) {
    var self = this;
    self.winkelWagen = localStorageService.getWinkelWagen(loginService.getIngelogdeUser().naam);
    var producten = localStorageService.getProducten();
    self.productInfo = [];
    self.totaal = 0;
    for (var i = 0; i < producten.length; i++) {
        for (var j = 0; j < self.winkelWagen.length; j++) {
            if (self.winkelWagen[j].product_id === producten[i].id) {
                self.productInfo.push(producten[i]);
                self.totaal = self.totaal + producten[i].prijs * self.winkelWagen[j].hoeveelheid;
            }
        }
    }

    self.opslaan = function () {
        localStorageService.setWinkelWagen(loginService.getIngelogdeUser().naam, self.winkelWagen);
        $location.path("home");
    };

    self.maakOrder = function () {
        var order = {
            id: loginService.getIngelogdeUser().naam + Date.now(),
            orderRegels: self.winkelWagen,
            totaalPrijs: self.totaal,
            user: loginService.getIngelogdeUser().naam,
            status: 'besteld'
        };
        localStorageService.addOrder(order, loginService.getIngelogdeUser().naam);
        localStorageService.setWinkelWagen(loginService.getIngelogdeUser().naam, []);
        $location.path("orders");
    };

    self.delete = function (item) {
        var index = self.winkelWagen.indexOf(item);
        if (index !== -1) {
            self.winkelWagen.splice(index, 1);
        }
    };
};

angular.module('app').controller('controller.winkelwagen', winkelwagenController);