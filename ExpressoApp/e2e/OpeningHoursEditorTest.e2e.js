describe('Opening Hours Editor Test', () => {
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

  it('should go to profile screen', async () => {
    await element(by.id('profileButton')).tap();
    await expect(element(by.id('Profile_Screen'))).toBeVisible();
  });

  it('should select opening hours editor', async () => {
    await element(by.id('openingHoursEditorButton')).tap();
  });

  it('should go to edit opening hours screen', async () => {
    await expect(element(by.id('Opening_Hours_Editor_Screen'))).toBeVisible();
  });
});

