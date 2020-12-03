import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PkgImagesUpdatePage from './pkg-images-update.page-object';

const expect = chai.expect;
export class PkgImagesDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bundlerProApp.pkgImages.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-pkgImages'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PkgImagesComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('pkg-images-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('pkg-images');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePkgImages() {
    await this.createButton.click();
    return new PkgImagesUpdatePage();
  }

  async deletePkgImages() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const pkgImagesDeleteDialog = new PkgImagesDeleteDialog();
    await waitUntilDisplayed(pkgImagesDeleteDialog.deleteModal);
    expect(await pkgImagesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bundlerProApp.pkgImages.delete.question/);
    await pkgImagesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(pkgImagesDeleteDialog.deleteModal);

    expect(await isVisible(pkgImagesDeleteDialog.deleteModal)).to.be.false;
  }
}
