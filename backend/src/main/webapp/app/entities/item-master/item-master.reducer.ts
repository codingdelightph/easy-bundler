import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItemMaster, defaultValue } from 'app/shared/model/item-master.model';

export const ACTION_TYPES = {
  SEARCH_ITEMMASTERS: 'itemMaster/SEARCH_ITEMMASTERS',
  FETCH_ITEMMASTER_LIST: 'itemMaster/FETCH_ITEMMASTER_LIST',
  FETCH_ITEMMASTER: 'itemMaster/FETCH_ITEMMASTER',
  CREATE_ITEMMASTER: 'itemMaster/CREATE_ITEMMASTER',
  UPDATE_ITEMMASTER: 'itemMaster/UPDATE_ITEMMASTER',
  DELETE_ITEMMASTER: 'itemMaster/DELETE_ITEMMASTER',
  RESET: 'itemMaster/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItemMaster>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ItemMasterState = Readonly<typeof initialState>;

// Reducer

export default (state: ItemMasterState = initialState, action): ItemMasterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ITEMMASTERS):
    case REQUEST(ACTION_TYPES.FETCH_ITEMMASTER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ITEMMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ITEMMASTER):
    case REQUEST(ACTION_TYPES.UPDATE_ITEMMASTER):
    case REQUEST(ACTION_TYPES.DELETE_ITEMMASTER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ITEMMASTERS):
    case FAILURE(ACTION_TYPES.FETCH_ITEMMASTER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEMMASTER):
    case FAILURE(ACTION_TYPES.CREATE_ITEMMASTER):
    case FAILURE(ACTION_TYPES.UPDATE_ITEMMASTER):
    case FAILURE(ACTION_TYPES.DELETE_ITEMMASTER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ITEMMASTERS):
    case SUCCESS(ACTION_TYPES.FETCH_ITEMMASTER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEMMASTER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ITEMMASTER):
    case SUCCESS(ACTION_TYPES.UPDATE_ITEMMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ITEMMASTER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/item-masters';
const apiSearchUrl = 'api/_search/item-masters';

// Actions

export const getSearchEntities: ICrudSearchAction<IItemMaster> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ITEMMASTERS,
  payload: axios.get<IItemMaster>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IItemMaster> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ITEMMASTER_LIST,
  payload: axios.get<IItemMaster>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IItemMaster> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEMMASTER,
    payload: axios.get<IItemMaster>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IItemMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ITEMMASTER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IItemMaster> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ITEMMASTER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IItemMaster> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ITEMMASTER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
