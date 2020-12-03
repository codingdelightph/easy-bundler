import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItemPackage, defaultValue } from 'app/shared/model/item-package.model';

export const ACTION_TYPES = {
  SEARCH_ITEMPACKAGES: 'itemPackage/SEARCH_ITEMPACKAGES',
  FETCH_ITEMPACKAGE_LIST: 'itemPackage/FETCH_ITEMPACKAGE_LIST',
  FETCH_ITEMPACKAGE: 'itemPackage/FETCH_ITEMPACKAGE',
  CREATE_ITEMPACKAGE: 'itemPackage/CREATE_ITEMPACKAGE',
  UPDATE_ITEMPACKAGE: 'itemPackage/UPDATE_ITEMPACKAGE',
  DELETE_ITEMPACKAGE: 'itemPackage/DELETE_ITEMPACKAGE',
  RESET: 'itemPackage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItemPackage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ItemPackageState = Readonly<typeof initialState>;

// Reducer

export default (state: ItemPackageState = initialState, action): ItemPackageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ITEMPACKAGES):
    case REQUEST(ACTION_TYPES.FETCH_ITEMPACKAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ITEMPACKAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ITEMPACKAGE):
    case REQUEST(ACTION_TYPES.UPDATE_ITEMPACKAGE):
    case REQUEST(ACTION_TYPES.DELETE_ITEMPACKAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ITEMPACKAGES):
    case FAILURE(ACTION_TYPES.FETCH_ITEMPACKAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEMPACKAGE):
    case FAILURE(ACTION_TYPES.CREATE_ITEMPACKAGE):
    case FAILURE(ACTION_TYPES.UPDATE_ITEMPACKAGE):
    case FAILURE(ACTION_TYPES.DELETE_ITEMPACKAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ITEMPACKAGES):
    case SUCCESS(ACTION_TYPES.FETCH_ITEMPACKAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEMPACKAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ITEMPACKAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_ITEMPACKAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ITEMPACKAGE):
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

const apiUrl = 'api/item-packages';
const apiSearchUrl = 'api/_search/item-packages';

// Actions

export const getSearchEntities: ICrudSearchAction<IItemPackage> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ITEMPACKAGES,
  payload: axios.get<IItemPackage>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IItemPackage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ITEMPACKAGE_LIST,
  payload: axios.get<IItemPackage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IItemPackage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEMPACKAGE,
    payload: axios.get<IItemPackage>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IItemPackage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ITEMPACKAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IItemPackage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ITEMPACKAGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IItemPackage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ITEMPACKAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
