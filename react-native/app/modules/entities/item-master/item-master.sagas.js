import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import ItemMasterActions from './item-master.reducer'

export function* getItemMaster(api, action) {
  const { itemMasterId } = action
  // make the call to the api
  const apiCall = call(api.getItemMaster, itemMasterId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemMasterActions.itemMasterSuccess(response.data))
  } else {
    yield put(ItemMasterActions.itemMasterFailure(response.data))
  }
}

export function* getItemMasters(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getItemMasters, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemMasterActions.itemMasterAllSuccess(response.data, response.headers))
  } else {
    yield put(ItemMasterActions.itemMasterAllFailure(response.data))
  }
}

export function* updateItemMaster(api, action) {
  const { itemMaster } = action
  // make the call to the api
  const idIsNotNull = !!itemMaster.id
  const apiCall = call(idIsNotNull ? api.updateItemMaster : api.createItemMaster, itemMaster)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemMasterActions.itemMasterUpdateSuccess(response.data))
  } else {
    yield put(ItemMasterActions.itemMasterUpdateFailure(response.data))
  }
}

export function* searchItemMasters(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchItemMasters, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemMasterActions.itemMasterSearchSuccess(response.data))
  } else {
    yield put(ItemMasterActions.itemMasterSearchFailure(response.data))
  }
}
export function* deleteItemMaster(api, action) {
  const { itemMasterId } = action
  // make the call to the api
  const apiCall = call(api.deleteItemMaster, itemMasterId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(ItemMasterActions.itemMasterDeleteSuccess())
  } else {
    yield put(ItemMasterActions.itemMasterDeleteFailure(response.data))
  }
}
