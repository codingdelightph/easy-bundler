import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ItemPackageDetailsUpdatePage from './item-package-details-update.page-object';

const expect = chai.expect;
export class ItemPackageDetailsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bundlerProApp.itemPackageDetails.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemPackageDetails'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ItemPackageDetailsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('item-package-details-heading'));
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
    await navBarPage.getEntityPage('item-package-details');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateItemPackageDetails() {
    await this.createButton.click();
    return new ItemPackageDetailsUpdatePage();
  }

  async deleteItemPackageDetails() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const itemPackageDetailsDeleteDialog = new ItemPackageDetailsDeleteDialog();
    await waitUntilDisplayed(itemPackageDetailsDeleteDialog.deleteModal);
    expect(await itemPackageDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /bundlerProApp.itemPackageDetails.delete.question/
    );
    await itemPackageDetailsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(itemPackageDetailsDeleteDialog.deleteModal);

    expect(await isVisible(itemPackageDetailsDeleteDialog.deleteModal)).to.be.false;
  }
}
