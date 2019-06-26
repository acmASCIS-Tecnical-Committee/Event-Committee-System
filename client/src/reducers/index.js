import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './proflieReducer';
import coWorkingSpaceReducer from './coWorkingSpaceReducer';
import storesReducer from './storesReducer';
import resourceReducer from './resourceReducer';
import ownerReducer from './ownerReducer';
import materialsReducer from './materialsReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile : profileReducer,
  coWorkingSpaces:coWorkingSpaceReducer,
  stores:storesReducer,
  resources : resourceReducer,
  owners: ownerReducer,
  materials : materialsReducer
});
