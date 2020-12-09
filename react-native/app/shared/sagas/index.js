import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { ItemMasterTypes } from '../../modules/entities/item-master/item-master.reducer'
import { ItemPackageTypes } from '../../modules/entities/item-package/item-package.reducer'
import { ItemPackageDetailTypes } from '../../modules/entities/item-package-details/item-package-details.reducer'
import { PkgImageTypes } from '../../modules/entities/pkg-images/pkg-images.reducer'
import { UserProductTypes } from '../../modules/entities/user-product/user-product.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import {
  getItemMaster,
  getItemMasters,
  updateItemMaster,
  deleteItemMaster,
  searchItemMasters,
} from '../../modules/entities/item-master/item-master.sagas'
import {
  getItemPackage,
  getItemPackages,
  updateItemPackage,
  deleteItemPackage,
  searchItemPackages,
} from '../../modules/entities/item-package/item-package.sagas'
import {
  getItemPackageDetail,
  getItemPackageDetails,
  updateItemPackageDetail,
  deleteItemPackageDetail,
  searchItemPackageDetails,
} from '../../modules/entities/item-package-details/item-package-details.sagas'
import {
  getPkgImage,
  getPkgImages,
  updatePkgImage,
  deletePkgImage,
  searchPkgImages,
} from '../../modules/entities/pkg-images/pkg-images.sagas'
import {
  getUserProduct,
  getUserProducts,
  updateUserProduct,
  updateUserProductImage,
  deleteUserProduct,
  searchUserProducts,
} from '../../modules/entities/user-product/user-product.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(ItemMasterTypes.ITEM_MASTER_REQUEST, getItemMaster, api),
    takeLatest(ItemMasterTypes.ITEM_MASTER_ALL_REQUEST, getItemMasters, api),
    takeLatest(ItemMasterTypes.ITEM_MASTER_UPDATE_REQUEST, updateItemMaster, api),
    takeLatest(ItemMasterTypes.ITEM_MASTER_DELETE_REQUEST, deleteItemMaster, api),
    takeLatest(ItemMasterTypes.ITEM_MASTER_SEARCH_REQUEST, searchItemMasters, api),

    takeLatest(ItemPackageTypes.ITEM_PACKAGE_REQUEST, getItemPackage, api),
    takeLatest(ItemPackageTypes.ITEM_PACKAGE_ALL_REQUEST, getItemPackages, api),
    takeLatest(ItemPackageTypes.ITEM_PACKAGE_UPDATE_REQUEST, updateItemPackage, api),
    takeLatest(ItemPackageTypes.ITEM_PACKAGE_DELETE_REQUEST, deleteItemPackage, api),
    takeLatest(ItemPackageTypes.ITEM_PACKAGE_SEARCH_REQUEST, searchItemPackages, api),

    takeLatest(ItemPackageDetailTypes.ITEM_PACKAGE_DETAIL_REQUEST, getItemPackageDetail, api),
    takeLatest(ItemPackageDetailTypes.ITEM_PACKAGE_DETAIL_ALL_REQUEST, getItemPackageDetails, api),
    takeLatest(ItemPackageDetailTypes.ITEM_PACKAGE_DETAIL_UPDATE_REQUEST, updateItemPackageDetail, api),
    takeLatest(ItemPackageDetailTypes.ITEM_PACKAGE_DETAIL_DELETE_REQUEST, deleteItemPackageDetail, api),
    takeLatest(ItemPackageDetailTypes.ITEM_PACKAGE_DETAIL_SEARCH_REQUEST, searchItemPackageDetails, api),

    takeLatest(PkgImageTypes.PKG_IMAGE_REQUEST, getPkgImage, api),
    takeLatest(PkgImageTypes.PKG_IMAGE_ALL_REQUEST, getPkgImages, api),
    takeLatest(PkgImageTypes.PKG_IMAGE_UPDATE_REQUEST, updatePkgImage, api),
    takeLatest(PkgImageTypes.PKG_IMAGE_DELETE_REQUEST, deletePkgImage, api),
    takeLatest(PkgImageTypes.PKG_IMAGE_SEARCH_REQUEST, searchPkgImages, api),

    takeLatest(UserProductTypes.USER_PRODUCT_REQUEST, getUserProduct, api),
    takeLatest(UserProductTypes.USER_PRODUCT_ALL_REQUEST, getUserProducts, api),
    takeLatest(UserProductTypes.USER_PRODUCT_UPDATE_REQUEST, updateUserProduct, api),
    takeLatest(UserProductTypes.USER_PRODUCT_UPDATE_IMAGE_REQUEST, updateUserProductImage, api),
    takeLatest(UserProductTypes.USER_PRODUCT_DELETE_REQUEST, deleteUserProduct, api),
    takeLatest(UserProductTypes.USER_PRODUCT_SEARCH_REQUEST, searchUserProducts, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ])
}
