import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import itemMaster, {
  ItemMasterState
} from 'app/entities/item-master/item-master.reducer';
// prettier-ignore
import itemPackage, {
  ItemPackageState
} from 'app/entities/item-package/item-package.reducer';
// prettier-ignore
import itemPackageDetails, {
  ItemPackageDetailsState
} from 'app/entities/item-package-details/item-package-details.reducer';
// prettier-ignore
import pkgImages, {
  PkgImagesState
} from 'app/entities/pkg-images/pkg-images.reducer';
// prettier-ignore
import userProduct, {
  UserProductState
} from 'app/entities/user-product/user-product.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly itemMaster: ItemMasterState;
  readonly itemPackage: ItemPackageState;
  readonly itemPackageDetails: ItemPackageDetailsState;
  readonly pkgImages: PkgImagesState;
  readonly userProduct: UserProductState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  itemMaster,
  itemPackage,
  itemPackageDetails,
  pkgImages,
  userProduct,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
