import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UserProductUpdatePage from './user-product-update.page-object';

const expect = chai.expect;
export class UserProductDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bundlerProApp.userProduct.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-userProduct'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UserProductComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('user-product-heading'));
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
    await navBarPage.getEntityPage('user-product');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUserProduct() {
    await this.createButton.click();
    return new UserProductUpdatePage();
  }

  async deleteUserProduct() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const userProductDeleteDialog = new UserProductDeleteDialog();
    await waitUntilDisplayed(userProductDeleteDialog.deleteModal);
    expect(await userProductDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bundlerProApp.userProduct.delete.question/);
    await userProductDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userProductDeleteDialog.deleteModal);

    expect(await isVisible(userProductDeleteDialog.deleteModal)).to.be.false;
  }
}
