import {
    OWNERS_LOADING,
    GET_OWNERS,
    CLEAR_CURRENT_OWNERS
  } from '../actions/types';
  
const initialState ={
 // owner: null,
  owners: null,
  loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case OWNERS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_OWNERS:
        return {
          ...state,
          owners: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_OWNERS:
        return {
          ...state,
          owners: null
        };
      default:
        return state;
    }
  }
  