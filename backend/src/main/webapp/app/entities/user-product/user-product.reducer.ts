import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserProduct, defaultValue } from 'app/shared/model/user-product.model';

export const ACTION_TYPES = {
  SEARCH_USERPRODUCTS: 'userProduct/SEARCH_USERPRODUCTS',
  FETCH_USERPRODUCT_LIST: 'userProduct/FETCH_USERPRODUCT_LIST',
  FETCH_USERPRODUCT: 'userProduct/FETCH_USERPRODUCT',
  CREATE_USERPRODUCT: 'userProduct/CREATE_USERPRODUCT',
  UPDATE_USERPRODUCT: 'userProduct/UPDATE_USERPRODUCT',
  DELETE_USERPRODUCT: 'userProduct/DELETE_USERPRODUCT',
  RESET: 'userProduct/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserProduct>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UserProductState = Readonly<typeof initialState>;

// Reducer

export default (state: UserProductState = initialState, action): UserProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_USERPRODUCTS):
    case REQUEST(ACTION_TYPES.FETCH_USERPRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_USERPRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_USERPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_USERPRODUCTS):
    case FAILURE(ACTION_TYPES.FETCH_USERPRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_USERPRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_USERPRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_USERPRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_USERPRODUCTS):
    case SUCCESS(ACTION_TYPES.FETCH_USERPRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPRODUCT):
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

const apiUrl = 'api/user-products';
const apiSearchUrl = 'api/_search/user-products';

// Actions

export const getSearchEntities: ICrudSearchAction<IUserProduct> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_USERPRODUCTS,
  payload: axios.get<IUserProduct>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IUserProduct> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPRODUCT_LIST,
  payload: axios.get<IUserProduct>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUserProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPRODUCT,
    payload: axios.get<IUserProduct>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUserProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPRODUCT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
