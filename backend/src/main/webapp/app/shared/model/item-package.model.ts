import { IItemPackageDetails } from 'app/shared/model/item-package-details.model';
import { IPkgImages } from 'app/shared/model/pkg-images.model';

export interface IItemPackage {
  id?: number;
  packageID?: number;
  code?: string;
  description?: string;
  pkgDets?: IItemPackageDetails[];
  pkgImgs?: IPkgImages[];
}

export const defaultValue: Readonly<IItemPackage> = {};
