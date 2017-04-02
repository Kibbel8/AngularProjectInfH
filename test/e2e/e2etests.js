describe('E2E: loginController', function () {

    beforeEach(function () {
        browser.get('http://localhost:56774/#/login');
    });

    it('should display a succes message', function () {

        element(by.id('naam')).sendKeys("admin");
        element(by.id('wachtwoord')).sendKeys("password");
        element(by.id('submit')).click();
        var h1 = element(by.id('message'));
        var h1Text = h1.getText();
        expect(h1Text).toBe("je bent ingelogd");
    });

    it('should display a failure message', function () {

        element(by.id('naam')).sendKeys("admin");
        element(by.id('submit')).click();
        var h1 = element(by.id('message'));
        var h1Text = h1.getText();
        expect(h1Text).toBe("inlog niet succesvol");
    });

});