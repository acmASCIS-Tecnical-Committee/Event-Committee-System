import axios from 'axios';
import {PROFILE_LOADING ,GET_PROFILE , CLEAR_CURRENT_PROFILE} from './types';


export const setProfileLoding = () =>{
    return {
        type:PROFILE_LOADING
    };
};

export const getProfile = () => dispatch =>{
    dispatch (setProfileLoding ()); 
    axios.get("api/user/profile")
    .then( 
        res=>{
            dispatch ({
                type:GET_PROFILE ,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};


export const clearCurrentProfile = () => {
    return {
      type: CLEAR_CURRENT_PROFILE
    };
  };
