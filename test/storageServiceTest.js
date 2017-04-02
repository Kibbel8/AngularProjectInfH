describe('factory: localStorageService', function () {

    var store = {};
    var factory;
    //Sets up a mocked local storage;
    beforeEach(function () {
        angular.mock.module('app');
        angular.mock.inject(['localStorageService', function (target) {
            factory = target;
        }]);

        inject(function ($filter) {
            filter = $filter('upperFilter');
        });

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return JSON.stringify(store[key]);
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = JSON.parse(value);
        });
        spyOn(localStorage, 'clear').and.callFake(function () {
            store = {};
        });
    });

    afterEach(function () {
        localStorage.clear();
    });

    it('toevoegenAanWinkelwagen should set de winkelwagen voor de gespecifeerde user', function () {
        var user = "testUser";
        var winkelWagen = [{
            product_id: 4,
            hoeveelheid: 1
        },
        {
            product_id: 2,
            hoeveelheid: 4
        }];
        factory.setWinkelWagen(user, winkelWagen);

        expect(store).toEqual({
            winkelwagen: {
                testUser: [{
                    product_id: 4,
                    hoeveelheid: 1
                },
                {
                    product_id: 2,
                    hoeveelheid: 4
                }]
            }
        });
    });

    it('toevoegenAanWinkelwagen should add a new winkelwagen item for a specified user', function () {
        store = {
            winkelwagen: {
                testUser: [{
                    product_id: 4,
                    hoeveelheid: 1
                },
                {
                    product_id: 2,
                    hoeveelheid: 4
                }],
                UserTest: [{
                    product_id: 1,
                    hoeveelheid: 6
                }]
            }
        };
        var product_id = 3;
        var hoeveelheid = 2;
        var user = "testUser";
        factory.toevoegenAanWinkelwagen(product_id, hoeveelheid, user);
        expect(store).toEqual({
            winkelwagen: {
                testUser: [{
                    product_id: 4,
                    hoeveelheid: 1
                },
                {
                    product_id: 2,
                    hoeveelheid: 4
                },
                {
                    product_id: 3,
                    hoeveelheid: 2
                }
                ],
                UserTest: [{
                    product_id: 1,
                    hoeveelheid: 6
                }]
            }
        });
    });

    it('toevoegenAanWinkelwagen should add the amount to the existing item in the winkelwagen for a specified user', function () {
        store = {
            winkelwagen: {
                testUser: [{
                    product_id: 4,
                    hoeveelheid: 1
                },
                {
                    product_id: 2,
                    hoeveelheid: 4
                }],
                UserTest: [{
                    product_id: 1,
                    hoeveelheid: 6
                }]
            }
        };
        var product_id = 4;
        var hoeveelheid = 2;
        var user = "testUser";
        factory.toevoegenAanWinkelwagen(product_id, hoeveelheid, user);
        expect(store).toEqual({
            winkelwagen: {
                testUser: [{
                    product_id: 4,
                    hoeveelheid: 3
                },
                {
                    product_id: 2,
                    hoeveelheid: 4
                }
                ],
                UserTest: [{
                    product_id: 1,
                    hoeveelheid: 6
                }]
            }
        });
    });

    it('toevoegenAanWinkelwagen should add the user and the wikelwagen item if user doesnt exist yet in winkelwagen', function () {
        var product_id = 4;
        var hoeveelheid = 2;
        var user = "testUser";        
        factory.toevoegenAanWinkelwagen(product_id, hoeveelheid, user);
        expect(store).toEqual({ winkelwagen: { testUser: [{ product_id: 4, hoeveelheid: 2 }] } });
    });

    it('toevoegenAanWinkelwagen should not add user if it is undefined', function () {
        var product_id = 4;
        var hoeveelheid = 2;
        var user;
        factory.toevoegenAanWinkelwagen(product_id, hoeveelheid, user);
        expect(store).toEqual({});
    });

    it('getWinkelWagen should return empty array wanneer de winkelwagenniet bestaat voor een user', function () {
        var result = factory.getWinkelWagen('TestUser');
        expect(result).toEqual([]);
    });
});