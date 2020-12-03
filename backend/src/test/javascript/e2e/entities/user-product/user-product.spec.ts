import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserProductComponentsPage from './user-product.page-object';
import UserProductUpdatePage from './user-product-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('UserProduct e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userProductComponentsPage: UserProductComponentsPage;
  let userProductUpdatePage: UserProductUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    userProductComponentsPage = new UserProductComponentsPage();
    userProductComponentsPage = await userProductComponentsPage.goToPage(navBarPage);
  });

  it('should load UserProducts', async () => {
    expect(await userProductComponentsPage.title.getText()).to.match(/User Products/);
    expect(await userProductComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UserProducts', async () => {
    const beforeRecordsCount = (await isVisible(userProductComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userProductComponentsPage.table);
    userProductUpdatePage = await userProductComponentsPage.goToCreateUserProduct();
    await userProductUpdatePage.enterData();

    expect(await userProductComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(userProductComponentsPage.table);
    await waitUntilCount(userProductComponentsPage.records, beforeRecordsCount + 1);
    expect(await userProductComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await userProductComponentsPage.deleteUserProduct();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(userProductComponentsPage.records, beforeRecordsCount);
      expect(await userProductComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(userProductComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
