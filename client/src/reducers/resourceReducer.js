import {
    GET_STORES,
    RESOURCES_LOADING,
    CLEAR_CURRENT_RESOURCES,
    GET_RESOURCES
  } from '../actions/types';
  
const initialState ={
 // store: null,
  resources: null,
  loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case RESOURCES_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_RESOURCES:
        return {
          ...state,
          resources: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_RESOURCES:
        return {
          ...state,
          resources: null
        };
      default:
        return state;
    }
  }
  