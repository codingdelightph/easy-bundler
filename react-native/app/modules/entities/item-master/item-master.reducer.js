import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  itemMasterRequest: ['itemMasterId'],
  itemMasterAllRequest: ['options'],
  itemMasterUpdateRequest: ['itemMaster'],
  itemMasterSearchRequest: ['query'],
  itemMasterDeleteRequest: ['itemMasterId'],

  itemMasterSuccess: ['itemMaster'],
  itemMasterAllSuccess: ['itemMasters', 'headers'],
  itemMasterUpdateSuccess: ['itemMaster'],
  itemMasterSearchSuccess: ['itemMasters'],
  itemMasterDeleteSuccess: [],

  itemMasterFailure: ['error'],
  itemMasterAllFailure: ['error'],
  itemMasterUpdateFailure: ['error'],
  itemMasterSearchFailure: ['error'],
  itemMasterDeleteFailure: ['error'],

  itemMasterReset: [],
})

export const ItemMasterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  itemMaster: null,
  itemMasters: [],
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
    itemMaster: null,
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
  const { itemMaster } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    itemMaster,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { itemMasters } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    itemMasters,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { itemMaster } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    itemMaster,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { itemMasters } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    itemMasters,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    itemMaster: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    itemMaster: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    itemMasters: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    itemMaster: state.itemMaster,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    itemMaster: state.itemMaster,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    itemMasters: [],
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_MASTER_REQUEST]: request,
  [Types.ITEM_MASTER_ALL_REQUEST]: allRequest,
  [Types.ITEM_MASTER_UPDATE_REQUEST]: updateRequest,
  [Types.ITEM_MASTER_SEARCH_REQUEST]: searchRequest,
  [Types.ITEM_MASTER_DELETE_REQUEST]: deleteRequest,

  [Types.ITEM_MASTER_SUCCESS]: success,
  [Types.ITEM_MASTER_ALL_SUCCESS]: allSuccess,
  [Types.ITEM_MASTER_UPDATE_SUCCESS]: updateSuccess,
  [Types.ITEM_MASTER_SEARCH_SUCCESS]: searchSuccess,
  [Types.ITEM_MASTER_DELETE_SUCCESS]: deleteSuccess,

  [Types.ITEM_MASTER_FAILURE]: failure,
  [Types.ITEM_MASTER_ALL_FAILURE]: allFailure,
  [Types.ITEM_MASTER_UPDATE_FAILURE]: updateFailure,
  [Types.ITEM_MASTER_SEARCH_FAILURE]: searchFailure,
  [Types.ITEM_MASTER_DELETE_FAILURE]: deleteFailure,
  [Types.ITEM_MASTER_RESET]: reset,
})
