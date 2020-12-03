import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPkgImages, defaultValue } from 'app/shared/model/pkg-images.model';

export const ACTION_TYPES = {
  SEARCH_PKGIMAGES: 'pkgImages/SEARCH_PKGIMAGES',
  FETCH_PKGIMAGES_LIST: 'pkgImages/FETCH_PKGIMAGES_LIST',
  FETCH_PKGIMAGES: 'pkgImages/FETCH_PKGIMAGES',
  CREATE_PKGIMAGES: 'pkgImages/CREATE_PKGIMAGES',
  UPDATE_PKGIMAGES: 'pkgImages/UPDATE_PKGIMAGES',
  DELETE_PKGIMAGES: 'pkgImages/DELETE_PKGIMAGES',
  RESET: 'pkgImages/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPkgImages>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PkgImagesState = Readonly<typeof initialState>;

// Reducer

export default (state: PkgImagesState = initialState, action): PkgImagesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PKGIMAGES):
    case REQUEST(ACTION_TYPES.FETCH_PKGIMAGES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PKGIMAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PKGIMAGES):
    case REQUEST(ACTION_TYPES.UPDATE_PKGIMAGES):
    case REQUEST(ACTION_TYPES.DELETE_PKGIMAGES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PKGIMAGES):
    case FAILURE(ACTION_TYPES.FETCH_PKGIMAGES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PKGIMAGES):
    case FAILURE(ACTION_TYPES.CREATE_PKGIMAGES):
    case FAILURE(ACTION_TYPES.UPDATE_PKGIMAGES):
    case FAILURE(ACTION_TYPES.DELETE_PKGIMAGES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PKGIMAGES):
    case SUCCESS(ACTION_TYPES.FETCH_PKGIMAGES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PKGIMAGES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PKGIMAGES):
    case SUCCESS(ACTION_TYPES.UPDATE_PKGIMAGES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PKGIMAGES):
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

const apiUrl = 'api/pkg-images';
const apiSearchUrl = 'api/_search/pkg-images';

// Actions

export const getSearchEntities: ICrudSearchAction<IPkgImages> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PKGIMAGES,
  payload: axios.get<IPkgImages>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IPkgImages> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PKGIMAGES_LIST,
  payload: axios.get<IPkgImages>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPkgImages> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PKGIMAGES,
    payload: axios.get<IPkgImages>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPkgImages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PKGIMAGES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPkgImages> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PKGIMAGES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPkgImages> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PKGIMAGES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
