import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ItemPackageDetailsComponentsPage from './item-package-details.page-object';
import ItemPackageDetailsUpdatePage from './item-package-details-update.page-object';
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

describe('ItemPackageDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemPackageDetailsComponentsPage: ItemPackageDetailsComponentsPage;
  let itemPackageDetailsUpdatePage: ItemPackageDetailsUpdatePage;

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
    itemPackageDetailsComponentsPage = new ItemPackageDetailsComponentsPage();
    itemPackageDetailsComponentsPage = await itemPackageDetailsComponentsPage.goToPage(navBarPage);
  });

  it('should load ItemPackageDetails', async () => {
    expect(await itemPackageDetailsComponentsPage.title.getText()).to.match(/Item Package Details/);
    expect(await itemPackageDetailsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ItemPackageDetails', async () => {
    const beforeRecordsCount = (await isVisible(itemPackageDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(itemPackageDetailsComponentsPage.table);
    itemPackageDetailsUpdatePage = await itemPackageDetailsComponentsPage.goToCreateItemPackageDetails();
    await itemPackageDetailsUpdatePage.enterData();

    expect(await itemPackageDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(itemPackageDetailsComponentsPage.table);
    await waitUntilCount(itemPackageDetailsComponentsPage.records, beforeRecordsCount + 1);
    expect(await itemPackageDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await itemPackageDetailsComponentsPage.deleteItemPackageDetails();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(itemPackageDetailsComponentsPage.records, beforeRecordsCount);
      expect(await itemPackageDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(itemPackageDetailsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
