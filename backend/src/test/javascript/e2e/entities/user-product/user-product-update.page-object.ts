import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserProductUpdatePage {
  pageTitle: ElementFinder = element(by.id('bundlerProApp.userProduct.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  packageIDInput: ElementFinder = element(by.css('input#user-product-packageID'));
  imageUrlInput: ElementFinder = element(by.css('input#user-product-imageUrl'));
  userSelect: ElementFinder = element(by.css('select#user-product-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPackageIDInput(packageID) {
    await this.packageIDInput.sendKeys(packageID);
  }

  async getPackageIDInput() {
    return this.packageIDInput.getAttribute('value');
  }

  async setImageUrlInput(imageUrl) {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    await this.setImageUrlInput('imageUrl');
    expect(await this.getImageUrlInput()).to.match(/imageUrl/);
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
