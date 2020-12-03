import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ItemPackageUpdatePage {
  pageTitle: ElementFinder = element(by.id('bundlerProApp.itemPackage.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  packageIDInput: ElementFinder = element(by.css('input#item-package-packageID'));
  codeInput: ElementFinder = element(by.css('input#item-package-code'));
  descriptionInput: ElementFinder = element(by.css('input#item-package-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPackageIDInput(packageID) {
    await this.packageIDInput.sendKeys(packageID);
  }

  async getPackageIDInput() {
    return this.packageIDInput.getAttribute('value');
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
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
