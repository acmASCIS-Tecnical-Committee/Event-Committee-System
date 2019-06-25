import axios from 'axios';
import {GET_ERRORS, RESOURCES_LOADING, CLEAR_CURRENT_RESOURCES} from './types';


export const setStoresLoding = () =>{
    return {
        type:RESOURCES_LOADING
    };
};

export const createResource = (ResourceData, history) => dispatch => {
  axios
  .post('api/resource/register', ResourceData)
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


export const clearCurrentResources = () => {
    return {
      type: CLEAR_CURRENT_RESOURCES
    };
  };
