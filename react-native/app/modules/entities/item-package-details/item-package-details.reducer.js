import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  itemPackageDetailRequest: ['itemPackageDetailId'],
  itemPackageDetailAllRequest: ['options'],
  itemPackageDetailUpdateRequest: ['itemPackageDetail'],
  itemPackageDetailSearchRequest: ['query'],
  itemPackageDetailDeleteRequest: ['itemPackageDetailId'],

  itemPackageDetailSuccess: ['itemPackageDetail'],
  itemPackageDetailAllSuccess: ['itemPackageDetails', 'headers'],
  itemPackageDetailUpdateSuccess: ['itemPackageDetail'],
  itemPackageDetailSearchSuccess: ['itemPackageDetails'],
  itemPackageDetailDeleteSuccess: [],

  itemPackageDetailFailure: ['error'],
  itemPackageDetailAllFailure: ['error'],
  itemPackageDetailUpdateFailure: ['error'],
  itemPackageDetailSearchFailure: ['error'],
  itemPackageDetailDeleteFailure: ['error'],

  itemPackageDetailReset: [],
})

export const ItemPackageDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  itemPackageDetail: null,
  itemPackageDetails: [],
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
    itemPackageDetail: null,
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
  const { itemPackageDetail } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    itemPackageDetail,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { itemPackageDetails } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    itemPackageDetails,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { itemPackageDetail } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    itemPackageDetail,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { itemPackageDetails } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    itemPackageDetails,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    itemPackageDetail: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    itemPackageDetail: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    itemPackageDetails: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    itemPackageDetail: state.itemPackageDetail,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    itemPackageDetail: state.itemPackageDetail,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    itemPackageDetails: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_PACKAGE_DETAIL_REQUEST]: request,
  [Types.ITEM_PACKAGE_DETAIL_ALL_REQUEST]: allRequest,
  [Types.ITEM_PACKAGE_DETAIL_UPDATE_REQUEST]: updateRequest,
  [Types.ITEM_PACKAGE_DETAIL_SEARCH_REQUEST]: searchRequest,
  [Types.ITEM_PACKAGE_DETAIL_DELETE_REQUEST]: deleteRequest,

  [Types.ITEM_PACKAGE_DETAIL_SUCCESS]: success,
  [Types.ITEM_PACKAGE_DETAIL_ALL_SUCCESS]: allSuccess,
  [Types.ITEM_PACKAGE_DETAIL_UPDATE_SUCCESS]: updateSuccess,
  [Types.ITEM_PACKAGE_DETAIL_SEARCH_SUCCESS]: searchSuccess,
  [Types.ITEM_PACKAGE_DETAIL_DELETE_SUCCESS]: deleteSuccess,

  [Types.ITEM_PACKAGE_DETAIL_FAILURE]: failure,
  [Types.ITEM_PACKAGE_DETAIL_ALL_FAILURE]: allFailure,
  [Types.ITEM_PACKAGE_DETAIL_UPDATE_FAILURE]: updateFailure,
  [Types.ITEM_PACKAGE_DETAIL_SEARCH_FAILURE]: searchFailure,
  [Types.ITEM_PACKAGE_DETAIL_DELETE_FAILURE]: deleteFailure,
  [Types.ITEM_PACKAGE_DETAIL_RESET]: reset,
})
