import React, { Component } from 'react';
// import PropTypes from './node_modules/prop-types';
// import { Link } from './node_modules/react-router-dom';
import isEmpty from '../../validation/is-empty';

class MaterialItem extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      show : false
    };
    
    this.changeShow = this.changeShow.bind(this);
  }
  changeShow()
  {
    this.setState((pervstate)=>({show : !pervstate.show}));
  }
  render() {
    const { material } = this.props;
    const materialData = (
      <div >
        <p>{material.name}</p>  
            <br></br> 
             <div>Providers: {material.providers.map(provider => (
                 <div key={provider._id}>
                 <p>store ID: {provider.store_id}</p>
                 <p>Price: {provider.price}</p>
                 
                </div>
             ))}</div>
             <br></br>
             <p>Notes: {material.notes}</p>

      </div>
    );
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div >
            <button className= " btn btn-lg btn-block btn-outline-info " onClick = {this.changeShow}>{material.name}</button>
            {this.state.show ? materialData : undefined}
          </div>
         
        </div>
      </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

export default MaterialItem;
