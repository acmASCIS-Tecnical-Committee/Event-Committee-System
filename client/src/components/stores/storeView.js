import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import StoreItem from './storeItem';
import { getStores} from '../../actions/storeActions';
import {Link} from  'react-router-dom';
class Stores extends Component {
  componentWillMount() {
    this.props.getStores();
  }

  render() {
    const { stores, loading } = this.props.stores;
    let storeItems;

    if (stores === null || loading) {
      storeItems = <Spinner />;
    } else {
      if (stores.length > 0) {
        storeItems = stores.map(store => (
          <StoreItem key={store._id} store={store} />
        ));
      } else {
        storeItems = <h4>No store found...</h4>;
      }
    }

    return (
      <div className="store">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Store</h1>
             
              {storeItems}
            </div >
            <Link className= " btn btn-lg btn-block btn-outline-info " to="/createstore">
                Add new Store
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
  stores: state.stores
});

export default connect(mapStateToProps, { getStores })(Stores);
