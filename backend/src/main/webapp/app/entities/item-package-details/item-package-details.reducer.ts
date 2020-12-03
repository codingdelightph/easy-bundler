import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IItemPackageDetails, defaultValue } from 'app/shared/model/item-package-details.model';

export const ACTION_TYPES = {
  SEARCH_ITEMPACKAGEDETAILS: 'itemPackageDetails/SEARCH_ITEMPACKAGEDETAILS',
  FETCH_ITEMPACKAGEDETAILS_LIST: 'itemPackageDetails/FETCH_ITEMPACKAGEDETAILS_LIST',
  FETCH_ITEMPACKAGEDETAILS: 'itemPackageDetails/FETCH_ITEMPACKAGEDETAILS',
  CREATE_ITEMPACKAGEDETAILS: 'itemPackageDetails/CREATE_ITEMPACKAGEDETAILS',
  UPDATE_ITEMPACKAGEDETAILS: 'itemPackageDetails/UPDATE_ITEMPACKAGEDETAILS',
  DELETE_ITEMPACKAGEDETAILS: 'itemPackageDetails/DELETE_ITEMPACKAGEDETAILS',
  RESET: 'itemPackageDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IItemPackageDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ItemPackageDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: ItemPackageDetailsState = initialState, action): ItemPackageDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_ITEMPACKAGEDETAILS):
    case REQUEST(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ITEMPACKAGEDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_ITEMPACKAGEDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_ITEMPACKAGEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_ITEMPACKAGEDETAILS):
    case FAILURE(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_ITEMPACKAGEDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_ITEMPACKAGEDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_ITEMPACKAGEDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_ITEMPACKAGEDETAILS):
    case SUCCESS(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ITEMPACKAGEDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_ITEMPACKAGEDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ITEMPACKAGEDETAILS):
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

const apiUrl = 'api/item-package-details';
const apiSearchUrl = 'api/_search/item-package-details';

// Actions

export const getSearchEntities: ICrudSearchAction<IItemPackageDetails> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_ITEMPACKAGEDETAILS,
  payload: axios.get<IItemPackageDetails>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IItemPackageDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS_LIST,
  payload: axios.get<IItemPackageDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IItemPackageDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ITEMPACKAGEDETAILS,
    payload: axios.get<IItemPackageDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IItemPackageDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ITEMPACKAGEDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IItemPackageDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ITEMPACKAGEDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IItemPackageDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ITEMPACKAGEDETAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
