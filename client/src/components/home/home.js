import {getProfile} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Home extends Component {
    componentWillMount() {
        this.props.getProfile();
    }

    render(){
        const {user} = this.props.auth;
        const {profile,loadding}= this.props.profile;


        let HomeContent;

        if(profile== null||loadding)
            HomeContent=<Spinner/>;
        else
        {
            HomeContent=<div>
            <p>{profile.name}</p>
            <p>{profile.type}</p>
            <p>{profile.mobile}</p>
            <p>{profile.email}</p>
            <Link to="/viewCoWorkingSpace">
                View Co-Working-Space
            </Link>
            <Link to="/createStore">
                Add new Store
            </Link>
            <Link to="/createResource">
                Add new Resource
            </Link>
            
            <Link to="/viewMaterials">
                View Material
            </Link>
            <Link to="/viewOwners">
                View Onwers
            </Link>
            </div>;
        }
        return HomeContent;
    
    
    
    
    
    }
}





Home.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfile })(Home);
  