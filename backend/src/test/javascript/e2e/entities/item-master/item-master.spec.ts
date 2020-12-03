import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ItemMasterComponentsPage from './item-master.page-object';
import ItemMasterUpdatePage from './item-master-update.page-object';
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

describe('ItemMaster e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemMasterComponentsPage: ItemMasterComponentsPage;
  let itemMasterUpdatePage: ItemMasterUpdatePage;

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
    itemMasterComponentsPage = new ItemMasterComponentsPage();
    itemMasterComponentsPage = await itemMasterComponentsPage.goToPage(navBarPage);
  });

  it('should load ItemMasters', async () => {
    expect(await itemMasterComponentsPage.title.getText()).to.match(/Item Masters/);
    expect(await itemMasterComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ItemMasters', async () => {
    const beforeRecordsCount = (await isVisible(itemMasterComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(itemMasterComponentsPage.table);
    itemMasterUpdatePage = await itemMasterComponentsPage.goToCreateItemMaster();
    await itemMasterUpdatePage.enterData();

    expect(await itemMasterComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(itemMasterComponentsPage.table);
    await waitUntilCount(itemMasterComponentsPage.records, beforeRecordsCount + 1);
    expect(await itemMasterComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await itemMasterComponentsPage.deleteItemMaster();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(itemMasterComponentsPage.records, beforeRecordsCount);
      expect(await itemMasterComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(itemMasterComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
