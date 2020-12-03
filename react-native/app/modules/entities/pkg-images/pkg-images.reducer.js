import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pkgImageRequest: ['pkgImageId'],
  pkgImageAllRequest: ['options'],
  pkgImageUpdateRequest: ['pkgImage'],
  pkgImageSearchRequest: ['query'],
  pkgImageDeleteRequest: ['pkgImageId'],

  pkgImageSuccess: ['pkgImage'],
  pkgImageAllSuccess: ['pkgImages', 'headers'],
  pkgImageUpdateSuccess: ['pkgImage'],
  pkgImageSearchSuccess: ['pkgImages'],
  pkgImageDeleteSuccess: [],

  pkgImageFailure: ['error'],
  pkgImageAllFailure: ['error'],
  pkgImageUpdateFailure: ['error'],
  pkgImageSearchFailure: ['error'],
  pkgImageDeleteFailure: ['error'],

  pkgImageReset: [],
})

export const PkgImageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  pkgImage: null,
  pkgImages: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    pkgImage: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to search from an api
export const searchRequest = (state) =>
  state.merge({
    searching: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { pkgImage } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    pkgImage,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { pkgImages } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    pkgImages,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { pkgImage } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    pkgImage,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { pkgImages } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    pkgImages,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    pkgImage: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    pkgImage: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    pkgImages: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    pkgImage: state.pkgImage,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    pkgImage: state.pkgImage,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    pkgImages: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PKG_IMAGE_REQUEST]: request,
  [Types.PKG_IMAGE_ALL_REQUEST]: allRequest,
  [Types.PKG_IMAGE_UPDATE_REQUEST]: updateRequest,
  [Types.PKG_IMAGE_SEARCH_REQUEST]: searchRequest,
  [Types.PKG_IMAGE_DELETE_REQUEST]: deleteRequest,

  [Types.PKG_IMAGE_SUCCESS]: success,
  [Types.PKG_IMAGE_ALL_SUCCESS]: allSuccess,
  [Types.PKG_IMAGE_UPDATE_SUCCESS]: updateSuccess,
  [Types.PKG_IMAGE_SEARCH_SUCCESS]: searchSuccess,
  [Types.PKG_IMAGE_DELETE_SUCCESS]: deleteSuccess,

  [Types.PKG_IMAGE_FAILURE]: failure,
  [Types.PKG_IMAGE_ALL_FAILURE]: allFailure,
  [Types.PKG_IMAGE_UPDATE_FAILURE]: updateFailure,
  [Types.PKG_IMAGE_SEARCH_FAILURE]: searchFailure,
  [Types.PKG_IMAGE_DELETE_FAILURE]: deleteFailure,
  [Types.PKG_IMAGE_RESET]: reset,
})
