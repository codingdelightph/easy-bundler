import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import PkgImageActions from './pkg-images.reducer'

export function* getPkgImage(api, action) {
  const { pkgImageId } = action
  // make the call to the api
  const apiCall = call(api.getPkgImage, pkgImageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PkgImageActions.pkgImageSuccess(response.data))
  } else {
    yield put(PkgImageActions.pkgImageFailure(response.data))
  }
}

export function* getPkgImages(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getPkgImages, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PkgImageActions.pkgImageAllSuccess(response.data, response.headers))
  } else {
    yield put(PkgImageActions.pkgImageAllFailure(response.data))
  }
}

export function* updatePkgImage(api, action) {
  const { pkgImage } = action
  // make the call to the api
  const idIsNotNull = !!pkgImage.id
  const apiCall = call(idIsNotNull ? api.updatePkgImage : api.createPkgImage, pkgImage)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PkgImageActions.pkgImageUpdateSuccess(response.data))
  } else {
    yield put(PkgImageActions.pkgImageUpdateFailure(response.data))
  }
}

export function* searchPkgImages(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchPkgImages, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PkgImageActions.pkgImageSearchSuccess(response.data))
  } else {
    yield put(PkgImageActions.pkgImageSearchFailure(response.data))
  }
}
export function* deletePkgImage(api, action) {
  const { pkgImageId } = action
  // make the call to the api
  const apiCall = call(api.deletePkgImage, pkgImageId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(PkgImageActions.pkgImageDeleteSuccess())
  } else {
    yield put(PkgImageActions.pkgImageDeleteFailure(response.data))
  }
}
