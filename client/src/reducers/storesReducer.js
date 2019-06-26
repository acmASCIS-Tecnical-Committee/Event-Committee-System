import {
    GET_STORES,
    STORES_LOADING,
    CLEAR_CURRENT_STORES
  } from '../actions/types';
  
const initialState ={
 // store: null,
  stores: null,
  loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case STORES_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_STORES:
        return {
          ...state,
          stores: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_STORES:
        return {
          ...state,
          coWorkingSpace: null
        };
      default:
        return state;
    }
  }
  