describe('Delete Menu Items Test', () => {
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

  it('should select the delete menu items option', async () => {
    await element(by.id('deleteMenuItemsButton')).tap();
  });

  it('should go to delete menu items screen', async () => {
    await expect(element(by.id('Delete_Menu_Item_Screen'))).toBeVisible();
  });
});

