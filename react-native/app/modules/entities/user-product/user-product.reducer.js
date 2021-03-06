import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userProductRequest: ['userProductId'],
  userProductAllRequest: ['options'],
  userProductUpdateRequest: ['userProduct'],
  userProductUpdateImageRequest: ['formData'],
  userProductSearchRequest: ['query'],
  userProductDeleteRequest: ['userProductId'],

  userProductSuccess: ['userProduct'],
  userProductAllSuccess: ['userProducts', 'headers'],
  userProductUpdateSuccess: ['userProduct'],
  userProductSearchSuccess: ['userProducts'],
  userProductDeleteSuccess: [],

  userProductFailure: ['error'],
  userProductAllFailure: ['error'],
  userProductUpdateFailure: ['error'],
  userProductSearchFailure: ['error'],
  userProductDeleteFailure: ['error'],

  userProductReset: [],
})

export const UserProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  userProduct: null,
  userProducts: [],
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
    userProduct: null,
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

export const updateImageRequest = (state) =>
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
  const { userProduct } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userProduct,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userProducts } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userProducts,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { userProduct } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    userProduct,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { userProducts } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    userProducts,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userProduct: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userProduct: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userProducts: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    userProduct: state.userProduct,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userProduct: state.userProduct,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    userProducts: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_PRODUCT_REQUEST]: request,
  [Types.USER_PRODUCT_ALL_REQUEST]: allRequest,
  [Types.USER_PRODUCT_UPDATE_REQUEST]: updateRequest,
  [Types.USER_PRODUCT_UPDATE_IMAGE_REQUEST]: updateRequest,
  [Types.USER_PRODUCT_SEARCH_REQUEST]: searchRequest,
  [Types.USER_PRODUCT_DELETE_REQUEST]: deleteRequest,

  [Types.USER_PRODUCT_SUCCESS]: success,
  [Types.USER_PRODUCT_ALL_SUCCESS]: allSuccess,
  [Types.USER_PRODUCT_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_PRODUCT_SEARCH_SUCCESS]: searchSuccess,
  [Types.USER_PRODUCT_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_PRODUCT_FAILURE]: failure,
  [Types.USER_PRODUCT_ALL_FAILURE]: allFailure,
  [Types.USER_PRODUCT_UPDATE_FAILURE]: updateFailure,
  [Types.USER_PRODUCT_SEARCH_FAILURE]: searchFailure,
  [Types.USER_PRODUCT_DELETE_FAILURE]: deleteFailure,
  [Types.USER_PRODUCT_RESET]: reset,
})
