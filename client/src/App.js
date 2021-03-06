import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';

import Home from './components/home/home';
import CoWorkingSpaceRegister from './components/coWorkingSpace/createCoWorkingSpace';
import './App.css';
import StoreRegister from './components/stores/createStore';
import OwnerRegister from './components/owner/createOwner';
import ResourceRegister from './components/resources/createRecource';
import MaterialRegister from './components/materials/createMaterial';
import Owners from './components/owner/ownersView';
import CoWorkingSpaces from './components/coWorkingSpace/coWorkingSpaceView';
import Materials from './components/materials/materialsView';
import Stores from './components/stores/storeView';
import Resources from './components/resources/resourcesView';
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
 // Clear current Profile
 store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/createStore" component={StoreRegister} />
              <Route exact path="/createMaterial" component={MaterialRegister} />
              <Route exact path="/createResource" component={ResourceRegister} />
              <Route exact path="/createOwner" component={OwnerRegister} />
              <Route exact path="/createCoWorkingSpace" component={CoWorkingSpaceRegister} />
              <Route exact path="/viewOwners" component={Owners} />
              <Route exact path="/viewCoWorkingSpace" component={CoWorkingSpaces} />
              <Route exact path="/viewMaterials" component={Materials} />
              <Route exact path="/viewStores" component={Stores} />
              <Route exact path="/viewResources" component={Resources} />

              

            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

