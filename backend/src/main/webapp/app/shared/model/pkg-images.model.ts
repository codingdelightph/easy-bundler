import { IItemPackage } from 'app/shared/model/item-package.model';

export interface IPkgImages {
  id?: number;
  packageID?: number;
  imageUrl?: string;
  pkg?: IItemPackage;
}

export const defaultValue: Readonly<IPkgImages> = {};
