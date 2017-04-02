var homeController = function (localStorageService, $location, loginService) {
    var self = this;
    self.producten = localStorageService.getProducten();

    for (var i = 0; i < self.producten.length; i++) {
        self.producten[i].hoeveelheid = 1;
    }

    self.toevoegenAanWinkelwagen = function (index, hoeveelheid) {
        localStorageService.toevoegenAanWinkelwagen(self.producten[index].id, self.producten[index].hoeveelheid, loginService.getIngelogdeUser().naam);
        self.producten[index].adding = false;
    };
};

angular.module('app').controller('controller.home', homeController);