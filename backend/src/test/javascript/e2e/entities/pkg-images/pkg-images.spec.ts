import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PkgImagesComponentsPage from './pkg-images.page-object';
import PkgImagesUpdatePage from './pkg-images-update.page-object';
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

describe('PkgImages e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pkgImagesComponentsPage: PkgImagesComponentsPage;
  let pkgImagesUpdatePage: PkgImagesUpdatePage;

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
    pkgImagesComponentsPage = new PkgImagesComponentsPage();
    pkgImagesComponentsPage = await pkgImagesComponentsPage.goToPage(navBarPage);
  });

  it('should load PkgImages', async () => {
    expect(await pkgImagesComponentsPage.title.getText()).to.match(/Pkg Images/);
    expect(await pkgImagesComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete PkgImages', async () => {
    const beforeRecordsCount = (await isVisible(pkgImagesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(pkgImagesComponentsPage.table);
    pkgImagesUpdatePage = await pkgImagesComponentsPage.goToCreatePkgImages();
    await pkgImagesUpdatePage.enterData();

    expect(await pkgImagesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(pkgImagesComponentsPage.table);
    await waitUntilCount(pkgImagesComponentsPage.records, beforeRecordsCount + 1);
    expect(await pkgImagesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await pkgImagesComponentsPage.deletePkgImages();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(pkgImagesComponentsPage.records, beforeRecordsCount);
      expect(await pkgImagesComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(pkgImagesComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
