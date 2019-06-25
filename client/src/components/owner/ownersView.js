import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import OwnersItem from './ownerItem';
import { getOwners } from '../../actions/ownerActions';
import {Link} from  'react-router-dom';
class Owners extends Component {
  componentWillMount() {
    this.props.getOwners();
  }

  render() {
    const { owners, loading } = this.props.owner;
    let ownersItems;

    if (owners === null || loading) {
      ownersItems = <Spinner />;
    } else {
      if (owners.length > 0) {
        ownersItems = owners.map(owner => (
          <OwnersItem key={owner._id} owner={owner} />
        ));
      } else {
        ownersItems = <h4>No Owners found...</h4>;
      }
    }

    return (
      <div className="owners">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {ownersItems}
            </div>
            <Link to="/createOwner">
                Add new Owner
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
  owner: state.owner
});

export default connect(mapStateToProps, { getOwners })(Owners);
