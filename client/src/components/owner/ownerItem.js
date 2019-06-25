import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class OwnerItem extends Component {
  render() {
    const { owner } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div className="col-lg-6 col-md-4 col-8">
            <a href={owner.social_media}>{owner.name}</a>
            <br></br>
            <a herf = {"mailto:"+owner.email}>E-mail: {owner.email}</a>
             <div>Mobile: {owner.mobile.map(mob => (
                 <p key={mob}>{mob}</p>
             ))}</div>
          </div>
         
        </div>
      </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

export default OwnerItem;
