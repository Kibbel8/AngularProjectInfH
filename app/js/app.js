var app = angular.module('app', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    var pages = ['home', 'winkelwagen', 'login', 'producten', 'orders', 'editOrders'];
    for (var i = 0; i < pages.length; i++) {
        $routeProvider.when('/' + pages[i], {
            templateUrl: 'app/views/' + pages[i] + '.html',
            controller: 'controller.' + pages[i],
            controllerAs: 'ctrl'
        });
    }

    $routeProvider.otherwise({
        redirectTo: '/login'
    });
}]);