import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ItemPackageActions from './item-package.reducer'

export function* getItemPackage(api, action) {
  const { itemPackageId } = action
  // make the call to the api
  const apiCall = call(api.getItemPackage, itemPackageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageActions.itemPackageSuccess(response.data))
  } else {
    yield put(ItemPackageActions.itemPackageFailure(response.data))
  }
}

export function* getItemPackages(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getItemPackages, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageActions.itemPackageAllSuccess(response.data, response.headers))
  } else {
    yield put(ItemPackageActions.itemPackageAllFailure(response.data))
  }
}

export function* updateItemPackage(api, action) {
  const { itemPackage } = action
  // make the call to the api
  const idIsNotNull = !!itemPackage.id
  const apiCall = call(idIsNotNull ? api.updateItemPackage : api.createItemPackage, itemPackage)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageActions.itemPackageUpdateSuccess(response.data))
  } else {
    yield put(ItemPackageActions.itemPackageUpdateFailure(response.data))
  }
}

export function* searchItemPackages(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchItemPackages, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageActions.itemPackageSearchSuccess(response.data))
  } else {
    yield put(ItemPackageActions.itemPackageSearchFailure(response.data))
  }
}
export function* deleteItemPackage(api, action) {
  const { itemPackageId } = action
  // make the call to the api
  const apiCall = call(api.deleteItemPackage, itemPackageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageActions.itemPackageDeleteSuccess())
  } else {
    yield put(ItemPackageActions.itemPackageDeleteFailure(response.data))
  }
}
