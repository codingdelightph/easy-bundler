import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UserProductActions from './user-product.reducer'

export function* getUserProduct(api, action) {
  const { userProductId } = action
  // make the call to the api
  const apiCall = call(api.getUserProduct, userProductId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductSuccess(response.data))
  } else {
    yield put(UserProductActions.userProductFailure(response.data))
  }
}

export function* getUserProducts(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserProducts, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductAllSuccess(response.data, response.headers))
  } else {
    yield put(UserProductActions.userProductAllFailure(response.data))
  }
}

export function* updateUserProduct(api, action) {
  const { userProduct } = action
  // make the call to the api
  const idIsNotNull = !!userProduct.id
  const apiCall = call(idIsNotNull ? api.updateUserProduct : api.createUserProduct, userProduct)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductUpdateSuccess(response.data))
  } else {
    yield put(UserProductActions.userProductUpdateFailure(response.data))
  }
}

export function* updateUserProductImage(api, action) {
  const { formData} = action
  // make the call to the api  
  const apiCall = call(api.updateUserProductImage, formData)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductUpdateSuccess(response.data))
  } else {
    yield put(UserProductActions.userProductUpdateFailure(response.data))
  }
}

/**
export function* updateUserProductImage(api, action) {
  const { userProduct } = action
  // make the call to the api
  const apiCall = call(api.updateUserProductImage, userProduct)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductUpdateSuccess(response.data))
  } else {
    yield put(UserProductActions.userProductUpdateFailure(response.data))
  }
}
 */

export function* searchUserProducts(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchUserProducts, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductSearchSuccess(response.data))
  } else {
    yield put(UserProductActions.userProductSearchFailure(response.data))
  }
}
export function* deleteUserProduct(api, action) {
  const { userProductId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserProduct, userProductId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserProductActions.userProductDeleteSuccess())
  } else {
    yield put(UserProductActions.userProductDeleteFailure(response.data))
  }
}
