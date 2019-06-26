import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import CoWorkingSpaceItem from './coWorkingSpaceItem';
import { getcoWorkingSpaces } from '../../actions/coWorkingSpaceActions';
import {Link} from  'react-router-dom';
class CoWorkingSpaces extends Component {
  componentWillMount() {
    this.props.getcoWorkingSpaces();
  }

  render() {
    const { coWorkingSpaces, loading } = this.props.coWorkingSpaces;
    let coWorkingSpaceItems;

    if (coWorkingSpaces === null || loading) {
      coWorkingSpaceItems = <Spinner />;
    } else {
      if (coWorkingSpaces.length > 0) {
        coWorkingSpaceItems = coWorkingSpaces.map(coWorkingSpace => (
          <CoWorkingSpaceItem key={coWorkingSpace._id} coWorkingSpace={coWorkingSpace} />
        ));
      } else {
        coWorkingSpaceItems = <h4>No coWorkingSpace found...</h4>;
      }
    }

    return (
      <div className="coWorkingSpaces">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12">
              <h1 className="display-4 text-center">coWorkingSpace</h1>
             
              {coWorkingSpaceItems}
            </div >
                      
              <Link className= " btn btn-lg btn-block btn-outline-info " to="/createCoWorkingSpace">
                  Add new coWorkingSpace
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
  coWorkingSpaces: state.coWorkingSpaces
});

export default connect(mapStateToProps, { getcoWorkingSpaces })(CoWorkingSpaces);
