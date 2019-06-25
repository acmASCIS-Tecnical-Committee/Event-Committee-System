import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './proflieReducer';
import coWorkingSpaceReducer from './coWorkingSpaceReducer';
import storesReducer from './storesReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile : profileReducer,
  coWorkingSpace:coWorkingSpaceReducer,
  stores:storesReducer
});
