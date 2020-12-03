import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ItemPackageDetailActions from './item-package-details.reducer'

export function* getItemPackageDetail(api, action) {
  const { itemPackageDetailId } = action
  // make the call to the api
  const apiCall = call(api.getItemPackageDetail, itemPackageDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageDetailActions.itemPackageDetailSuccess(response.data))
  } else {
    yield put(ItemPackageDetailActions.itemPackageDetailFailure(response.data))
  }
}

export function* getItemPackageDetails(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getItemPackageDetails, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageDetailActions.itemPackageDetailAllSuccess(response.data, response.headers))
  } else {
    yield put(ItemPackageDetailActions.itemPackageDetailAllFailure(response.data))
  }
}

export function* updateItemPackageDetail(api, action) {
  const { itemPackageDetail } = action
  // make the call to the api
  const idIsNotNull = !!itemPackageDetail.id
  const apiCall = call(idIsNotNull ? api.updateItemPackageDetail : api.createItemPackageDetail, itemPackageDetail)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageDetailActions.itemPackageDetailUpdateSuccess(response.data))
  } else {
    yield put(ItemPackageDetailActions.itemPackageDetailUpdateFailure(response.data))
  }
}

export function* searchItemPackageDetails(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchItemPackageDetails, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageDetailActions.itemPackageDetailSearchSuccess(response.data))
  } else {
    yield put(ItemPackageDetailActions.itemPackageDetailSearchFailure(response.data))
  }
}
export function* deleteItemPackageDetail(api, action) {
  const { itemPackageDetailId } = action
  // make the call to the api
  const apiCall = call(api.deleteItemPackageDetail, itemPackageDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemPackageDetailActions.itemPackageDetailDeleteSuccess())
  } else {
    yield put(ItemPackageDetailActions.itemPackageDetailDeleteFailure(response.data))
  }
}
