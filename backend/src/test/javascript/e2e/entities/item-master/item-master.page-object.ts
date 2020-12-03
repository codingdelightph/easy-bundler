import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ItemMasterUpdatePage from './item-master-update.page-object';

const expect = chai.expect;
export class ItemMasterDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bundlerProApp.itemMaster.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemMaster'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ItemMasterComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('item-master-heading'));
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
    await navBarPage.getEntityPage('item-master');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateItemMaster() {
    await this.createButton.click();
    return new ItemMasterUpdatePage();
  }

  async deleteItemMaster() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const itemMasterDeleteDialog = new ItemMasterDeleteDialog();
    await waitUntilDisplayed(itemMasterDeleteDialog.deleteModal);
    expect(await itemMasterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bundlerProApp.itemMaster.delete.question/);
    await itemMasterDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(itemMasterDeleteDialog.deleteModal);

    expect(await isVisible(itemMasterDeleteDialog.deleteModal)).to.be.false;
  }
}
