import axios from 'axios';
import {GET_ERRORS, MATERIALS_LOADING, CLEAR_CURRENT_MATERIALS} from './types';


export const setMaterialsLoding = () =>{
    return {
        type:MATERIALS_LOADING
    };
};

export const createMaterial = (MaterialData, history) => dispatch => {
  axios
  .post('api/material/register', MaterialData)
  .then(res => history.push('/home'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
  };

// TODO
/*
export const getcoWorkingSpace = () => dispatch =>{
    dispatch (setcoWorkingSpaceLoding ()); 
    axios.get("api/space/")
    .then( 
        res=>{
            dispatch ({
                type:GET_COWORKINGSPACE ,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_COWORKINGSPACE,
        payload: {}
      })
    );
};*/


export const clearCurrentMaterials = () => {
    return {
      type: CLEAR_CURRENT_MATERIALS
    };
  };
