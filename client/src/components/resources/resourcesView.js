import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ResourceItem from './resourceItem';
import { getResources } from '../../actions/resourceActions';
import {Link} from  'react-router-dom';
class Resources extends Component {
  componentWillMount() {
    this.props.getResources();
  }

  render() {
    const { resources, loading } = this.props.resources;
    let resourcesItems;

    if (resources === null || loading) {
      resourcesItems = <Spinner />;
    } else {
      if (resources.length > 0) {
        resourcesItems = resources.map(resource => (
          <ResourceItem key={resource._id} resource={resource} />
        ));
      } else {
        resourcesItems = <h4>No Resources found...</h4>;
      }
    }

    return (
      <div className="owners">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Resources</h1>
             
              {resourcesItems}
            </div >
                      
              <Link className= " btn btn-lg btn-block btn-outline-info " to="/createResource">
                  Add new Resource
              </Link>
            
          </div>
        </div>
      </div>
    );
  }
}

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  resources: state.resources
});

export default connect(mapStateToProps, { getResources })(Resources);
