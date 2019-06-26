import axios from 'axios';
import {GET_ERRORS, RESOURCES_LOADING, CLEAR_CURRENT_RESOURCES, GET_RESOURCES} from './types';


export const setResourcesLoding = () =>{
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


export const getResources = () => dispatch =>{
    dispatch (setResourcesLoding ()); 
    axios.get("api/resource/all")
    .then( 
        res=>{
            dispatch ({
                type:GET_RESOURCES ,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_RESOURCES,
        payload: {}
      })
    );
};


export const clearCurrentResources = () => {
    return {
      type: CLEAR_CURRENT_RESOURCES
    };
  };
