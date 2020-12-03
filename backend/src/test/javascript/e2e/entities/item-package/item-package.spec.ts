import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ItemPackageComponentsPage from './item-package.page-object';
import ItemPackageUpdatePage from './item-package-update.page-object';
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

describe('ItemPackage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemPackageComponentsPage: ItemPackageComponentsPage;
  let itemPackageUpdatePage: ItemPackageUpdatePage;

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
    itemPackageComponentsPage = new ItemPackageComponentsPage();
    itemPackageComponentsPage = await itemPackageComponentsPage.goToPage(navBarPage);
  });

  it('should load ItemPackages', async () => {
    expect(await itemPackageComponentsPage.title.getText()).to.match(/Item Packages/);
    expect(await itemPackageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ItemPackages', async () => {
    const beforeRecordsCount = (await isVisible(itemPackageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(itemPackageComponentsPage.table);
    itemPackageUpdatePage = await itemPackageComponentsPage.goToCreateItemPackage();
    await itemPackageUpdatePage.enterData();

    expect(await itemPackageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(itemPackageComponentsPage.table);
    await waitUntilCount(itemPackageComponentsPage.records, beforeRecordsCount + 1);
    expect(await itemPackageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await itemPackageComponentsPage.deleteItemPackage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(itemPackageComponentsPage.records, beforeRecordsCount);
      expect(await itemPackageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(itemPackageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
