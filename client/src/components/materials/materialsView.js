import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import MaterialItem from './materialItem';
import { getMaterials} from '../../actions/materialsActions';
import {Link} from  'react-router-dom';
class Materials extends Component {
  componentWillMount() {
    this.props.getMaterials();
  }

  render() {
    const { materials, loading } = this.props.materials;
    let materialItems;

    if (materials === null || loading) {
      materialItems = <Spinner />;
    } else {
      if (materials.length > 0) {
        materialItems = materials.map(material => (
          <MaterialItem key={material._id} material={material} />
        ));
      } else {
        materialItems = <h4>No material found...</h4>;
      }
    }

    return (
      <div className="material">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12">
              <h1 className="display-4 text-center">material</h1>
             
              {materialItems}
            </div >
            <Link className= " btn btn-lg btn-block btn-outline-info " to="/createMaterial">
                Add new Material
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
  materials: state.materials
});

export default connect(mapStateToProps, { getMaterials })(Materials);
