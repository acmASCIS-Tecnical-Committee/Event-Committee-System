import axios from 'axios';
import {GET_ERRORS, CLEAR_CURRENT_OWNERS, OWNERS_LOADING} from './types';


export const setOwnersLoding = () =>{
    return {
        type:OWNERS_LOADING
    };
};

export const createOwner = (OwnerData, history) => dispatch => {
  axios
  .post('api/owner/register', OwnerData)
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


export const clearowners = () => {
    return {
      type: CLEAR_CURRENT_OWNERS
    };
  };
