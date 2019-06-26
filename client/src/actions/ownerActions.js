import axios from 'axios';
import {GET_ERRORS, CLEAR_CURRENT_OWNERS, OWNERS_LOADING, GET_OWNERS} from './types';


export const setOwnersLoding = () =>{
    return {
        type:OWNERS_LOADING
    };
};

export const createOwner = (OwnerData, history) => dispatch => {
  axios
  .post('api/owner/register', OwnerData)
  .then(res => history.push('/viewOwners'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
  };


export const getOwners = () => dispatch =>{
    dispatch (setOwnersLoding ()); 
    axios.get("api/owner/all")
    .then( 
        res=>{
            dispatch ({
                type:GET_OWNERS ,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_OWNERS,
        payload: {}
      })
    );
};


export const clearowners = () => {
    return {
      type: CLEAR_CURRENT_OWNERS
    };
  };
