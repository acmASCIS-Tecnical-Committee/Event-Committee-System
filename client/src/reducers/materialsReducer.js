import {
     MATERIALS_LOADING, GET_MATERIALS, CLEAR_CURRENT_MATERIALS
    
  } from '../actions/types';
  
const initialState ={
 // material: null,
  materials: null,
  loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case MATERIALS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_MATERIALS:
        return {
          ...state,
          materials: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_MATERIALS:
        return {
          ...state,
          materials: null
        };
      default:
        return state;
    }
  }
  