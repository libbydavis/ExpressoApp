describe('Profile Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login', async () => {
    await expect(element(by.id('Login_Screen'))).toBeVisible();
    await element(by.id('usernameInput')).replaceText('filly@cafe.com');
    await element(by.id('passwordInput')).replaceText('fillycafe');
    await element(by.id('loginButton')).tap();
    await expect(element(by.id('Search_Screen'))).toBeVisible();
  });

  it('should select profile from header', async () => {
    await element(by.id('profileButton')).tap();
  });

  it('should go to profile screen', async () => {
    await expect(element(by.id('Profile_Screen'))).toBeVisible();
  });
});

