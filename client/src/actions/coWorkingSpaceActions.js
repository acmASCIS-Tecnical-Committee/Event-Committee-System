import axios from 'axios';
import {GET_ERRORS,CLEAR_CURRENT_COWORKINGSPACE ,COWORKINGSPACE_NOT_FOUND , COWORKINGSPACE_LOADING,GET_COWORKINGSPACE,GET_COWORKINGSPACES} from './types';


export const setcoWorkingSpaceLoding = () =>{
    return {
        type:COWORKINGSPACE_LOADING
    };
};

export const createcoWorkingSpace = (coWorkingSpaceData, history) => dispatch => {
  axios
  .post('api/space/register', coWorkingSpaceData)
  .then(res => history.push('/viewCoWorkingSpace'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
  };


export const getcoWorkingSpaces = () => dispatch =>{
    dispatch (setcoWorkingSpaceLoding ()); 
    axios.get("api/space/all")
    .then( 
        res=>{
            dispatch ({
                type:GET_COWORKINGSPACES ,
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
};


export const clearCurrentcoWorkingSpace = () => {
    return {
      type: CLEAR_CURRENT_COWORKINGSPACE
    };
  };
