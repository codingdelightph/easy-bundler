import { IUser } from 'app/shared/model/user.model';

export interface IItemMaster {
  id?: number;
  code?: string;
  description?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IItemMaster> = {};
