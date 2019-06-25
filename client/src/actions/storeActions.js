import axios from 'axios';
import {GET_ERRORS,CLEAR_CURRENT_STORES ,STORES_NOT_FOUND , STORES_LOADING,GET_STORES} from './types';


export const setStoresLoding = () =>{
    return {
        type:STORES_LOADING
    };
};

export const createStore = (StoreData, history) => dispatch => {
  axios
  .post('api/store/register', StoreData)
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


export const clearCurrentStores = () => {
    return {
      type: clearCurrentStores
    };
  };
