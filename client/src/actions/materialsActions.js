import axios from 'axios';
import {GET_ERRORS, MATERIALS_LOADING, CLEAR_CURRENT_MATERIALS, GET_MATERIALS} from './types';


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


export const getMaterials = () => dispatch =>{
    dispatch (setMaterialsLoding ()); 
    axios.get("api/material/all")
    .then( 
        res=>{
            dispatch ({
                type:GET_MATERIALS,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_MATERIALS,
        payload: {}
      })
    );
};


export const clearCurrentMaterials = () => {
    return {
      type: CLEAR_CURRENT_MATERIALS
    };
  };
