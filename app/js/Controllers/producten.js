var productenController = function (localStorageService, $scope) {
    var self = this;
    self.productenLijst = localStorageService.getProducten();
    
    self.nieuwProduct = function () {
        self.productenLijst.push(
            {
                id: self.productenLijst[self.productenLijst.length - 1].id + 1,
                naam: "",
                prijs: 0,
                foto: "",
                editing: true
            }
            );
    };
    self.delete = function (product) {
        var index = self.productenLijst.indexOf(product);
        if (index !== -1) {
            self.productenLijst.splice(index, 1);
        }
    };

    self.save = function () {
        for (var i = 0; i < self.productenLijst.length; i++) {
            self.productenLijst[i].editing = undefined;
        }
        localStorageService.setProducten(self.productenLijst);
    };

    previewFile = function (file) {
        //var image = document.getElementById("foto");
        var reader = new FileReader();

        reader.onloadend = function () {
            //image.src = reader.result;
            self.upload.foto = reader.result;
        };

        if (file) {
            reader.readAsDataURL(file); //reads the data as a URL
            if (!file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
                self.valid = false;
                self.errorMessage = "Dit bestand is geen afbeelding of wordt niet ondersteund";
                self.showError = true;
            } else if (file.size > 4194304) {
                self.valid = false;
                self.errorMessage = "Deze afbeelding is te groot";
                self.showError = true;
            } else {
                self.valid = true;
                self.showError = false;
            }

            //Have to refresh the bindings so the view updates the states
            $scope.$apply();
        }
    };
};

angular.module('app').controller('controller.producten', productenController);