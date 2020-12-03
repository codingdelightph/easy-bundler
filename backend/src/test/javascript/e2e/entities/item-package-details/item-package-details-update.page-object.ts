import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ItemPackageDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('bundlerProApp.itemPackageDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  packageIDInput: ElementFinder = element(by.css('input#item-package-details-packageID'));
  rowIDInput: ElementFinder = element(by.css('input#item-package-details-rowID'));
  codeInput: ElementFinder = element(by.css('input#item-package-details-code'));
  descriptionInput: ElementFinder = element(by.css('input#item-package-details-description'));
  pkgSelect: ElementFinder = element(by.css('select#item-package-details-pkg'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPackageIDInput(packageID) {
    await this.packageIDInput.sendKeys(packageID);
  }

  async getPackageIDInput() {
    return this.packageIDInput.getAttribute('value');
  }

  async setRowIDInput(rowID) {
    await this.rowIDInput.sendKeys(rowID);
  }

  async getRowIDInput() {
    return this.rowIDInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async pkgSelectLastOption() {
    await this.pkgSelect.all(by.tagName('option')).last().click();
  }

  async pkgSelectOption(option) {
    await this.pkgSelect.sendKeys(option);
  }

  getPkgSelect() {
    return this.pkgSelect;
  }

  async getPkgSelectedOption() {
    return this.pkgSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setPackageIDInput('5');
    expect(await this.getPackageIDInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRowIDInput('5');
    expect(await this.getRowIDInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.pkgSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
