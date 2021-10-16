describe('Login Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should go to login screen', async () => {
    await expect(element(by.id('Login_Screen'))).toBeVisible();
  });

  it('should fill login form', async () => {
    await element(by.id('usernameInput')).replaceText('filly@cafe.com');
    await element(by.id('passwordInput')).replaceText('incorrectpassword');
    await element(by.id('loginButton')).tap();
  });

  it('should show search screen', async () => {
    await expect(element(by.id('Search_Screen'))).toBeVisible();
  });
});

