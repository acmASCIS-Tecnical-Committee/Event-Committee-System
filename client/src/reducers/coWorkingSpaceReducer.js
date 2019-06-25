import {
    GET_COWORKINGSPACE,
    GET_COWORKINGSPACES,
    COWORKINGSPACE_LOADING,
    CLEAR_CURRENT_COWORKINGSPACE
  } from '../actions/types';
  
const initialState ={
  coWorkingSpace: null,
  coWorkingSpaces: null,
  loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case COWORKINGSPACE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_COWORKINGSPACES:
        return {
          ...state,
          coWorkingSpaces: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_COWORKINGSPACE:
        return {
          ...state,
          coWorkingSpace: null
        };
      default:
        return state;
    }
  }
  