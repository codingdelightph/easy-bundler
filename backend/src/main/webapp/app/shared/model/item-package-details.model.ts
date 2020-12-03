import { IItemPackage } from 'app/shared/model/item-package.model';

export interface IItemPackageDetails {
  id?: number;
  packageID?: number;
  rowID?: number;
  code?: string;
  description?: string;
  pkg?: IItemPackage;
}

export const defaultValue: Readonly<IItemPackageDetails> = {};
