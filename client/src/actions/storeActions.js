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
  .then(res => history.push('/viewStores'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
  };

export const getStores = () => dispatch =>{
    dispatch (setStoresLoding ()); 
    axios.get("api/store/all")
    .then( 
        res=>{
            dispatch ({
                type:GET_STORES ,
                payload :res.data
            })
        }
    )
    .catch(err =>
      dispatch({
        type: GET_STORES,
        payload: {}
      })
    );
};


export const clearCurrentStores = () => {
    return {
      type: CLEAR_CURRENT_STORES
    };
  };
