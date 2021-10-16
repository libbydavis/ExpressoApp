describe('Register User Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should go to register screen', async () => {
    await expect(element(by.id('Login_Screen'))).toBeVisible();
    await element(by.id('signUp')).tap();
    await expect(element(by.id('Register_Screen'))).toBeVisible();
  });

  it('should fill register form', async () => {
    await element(by.id('registerFirstName')).replaceText('Cruella');
    await element(by.id('registerLastName')).replaceText('Deville');
    await element(by.id('registerEmail')).replaceText('cruella@deville.com');
    await element(by.id('registerPassword')).replaceText('101dalmations');
    await element(by.id('registerButton')).tap();
  });

  it('should show search screen', async () => {
    await expect(element(by.id('Search_Screen'))).toBeVisible();
  });

});


