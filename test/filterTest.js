describe('Filter: upperFilter', function () {

    var filter;

    beforeEach(function () {
        module('app');
        inject(function ($filter) {
            filter = $filter('upperFilter');
        });
    });

    it('should test karma', function () {
        expect(true).toBeTruthy();
    });

    it('should return undefined', function () {
        var input = undefined;
        expect(filter(input)).toBeUndefined();
    });

    it('should capitalise the first letter only', function () {
        var input = "tttest string";
        expect(filter(input)).toBe("Tttest string");
    });

    it('should return an empty string', function () {
        var input = "";
        expect(filter(input)).toBe("");
    });

    it('should return the input number unmodified', function () {
        var input = 1000;
        expect(filter(input)).toBe(1000);
    });
});