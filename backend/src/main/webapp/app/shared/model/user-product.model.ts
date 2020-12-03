import { IUser } from 'app/shared/model/user.model';

export interface IUserProduct {
  id?: number;
  packageID?: number;
  imageUrl?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IUserProduct> = {};
