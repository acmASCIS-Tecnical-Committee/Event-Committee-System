import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ResourceItem extends Component {
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
    const { resource } = this.props;
    const resourceData = (<div className="col-lg-6 col-md-4 col-8">
    <p >{resource.name}</p>
    <p>{resource.details}</p>
    <p>{resource.feedback}</p>
     <div>Owners: {resource.owner.map(owner => (
       <div key={owner._id}>
          <p >{owner.ownerId}</p>
          <p>{owner.updated}</p>
        </div>
     ))}</div>
  </div>
 );
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
        <div >
            <button className= " btn btn-lg btn-block btn-outline-info " onClick = {this.changeShow}>{resource.name}</button>
            {this.state.show ? resourceData : undefined}
          </div>
          
        </div>
      </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

export default ResourceItem;
