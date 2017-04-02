app.filter('upperFilter', function () {
    return function (item) {
        if (item != undefined && item.length > 0) {
            item = item.replace(item[0], item[0].toUpperCase());
        }
        return item;
    };
});