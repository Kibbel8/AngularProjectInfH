//var app = angular.module('app', []);

app.factory("localStorageService", [function () {

    var toevoegenAanWinkelwagen = function (productID, hoeveelheid, user) {
        if (user !== undefined) {
            winkelWagenItem = {
                product_id: productID,
                hoeveelheid: hoeveelheid
            };
            var winkelWagen = getWinkelWagen(user);
            if (winkelWagen !== undefined) {
                if (winkelWagen.length !== 0) {
                    var exists = -1;
                    for (var i = 0; i < winkelWagen.length; i++) {
                        if (winkelWagenItem.product_id === winkelWagen[i].product_id) {
                            exists = i;
                        }
                    }
                    if (exists === -1) {
                        winkelWagen.push(winkelWagenItem);
                    } else {
                        winkelWagen[exists].hoeveelheid += winkelWagenItem.hoeveelheid;
                    }

                } else {
                    winkelWagen = [winkelWagenItem];
                }
            } else {
                winkelWagen = [winkelWagenItem];
            }
            setWinkelWagen(user, winkelWagen);
        }
    };

    var getWinkelWagen = function (user) {
        var winkelWagen = angular.fromJson(localStorage.getItem("winkelwagen") || {});
        return winkelWagen[user] || [];
    };

    var setWinkelWagen = function (user, userWinkelWagen) {
        var winkelWagen = angular.fromJson(localStorage.getItem("winkelwagen")) || {};
        winkelWagen[user] = userWinkelWagen;
        localStorage.setItem("winkelwagen", JSON.stringify(winkelWagen));
    };

    var getProducten = function () {
        var products = [{
            id: 1,
            naam: 'skateboard',
            prijs: 25.95,
            foto: 'data:image/jpeg;base64,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'
        }];
        var producten = angular.fromJson(localStorage.getItem("producten")) || products;
        return producten;
    };

    var setProducten = function (producten) {
        localStorage.setItem("producten", JSON.stringify(producten));
    };

    var addOrder = function (order, user) {
        var orders = angular.fromJson(localStorage.getItem("orders")) || {};
        if (orders.hasOwnProperty(user)) {
            orders[user].push(order);
        } else {
            orders[user] = [order];
        }
        localStorage.setItem("orders", JSON.stringify(orders));
    };

    var getOrders = function () {
        return angular.fromJson(localStorage.getItem("orders")) || {};
    };

    return {
        toevoegenAanWinkelwagen: toevoegenAanWinkelwagen,
        getWinkelWagen: getWinkelWagen,
        setWinkelWagen: setWinkelWagen,
        getProducten: getProducten,
        setProducten: setProducten,
        addOrder: addOrder,
        getOrders: getOrders
    };
}]);