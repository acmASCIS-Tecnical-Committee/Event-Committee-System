import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class CoWorkingSpaceItem extends Component {
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
    const { coWorkingSpace } = this.props;
    const coWorkingSpaceData = (
      <div className="col-lg-6 col-md-4 col-8">
        <a href={coWorkingSpace.social_media}>{coWorkingSpace.name}</a>
            <br></br>
            <a herf = {"mailto:"+coWorkingSpace.email}>E-mail: {coWorkingSpace.email}</a>
             <div>Mobile: {coWorkingSpace.mobile.map(mob => (
                 <p key={mob}>{mob}</p>
             ))}</div>
              <br></br>
            <a href={coWorkingSpace.address.link}>{coWorkingSpace.address.zone}</a>

             <br></br> 
             <div>Rooms: {coWorkingSpace.rooms.map(room => (
                 <div key={room._id}>
                 <p>Name: {room.name}</p>
                 <p>Capacity: {room.capacity}</p>
                 <p>Price: {room.price}</p>
                 <p>Cases: {room.special_cases}</p>
                 <p>Notes: {room.notes}</p>
                 </div>
             ))}</div>

            <br></br> 
             <div>Connections: {coWorkingSpace.connections.map(connection => (
                 <div key={connection._id}>
                 <p>Name: {connection.name}</p>
                 <p>Notes: {connection.notes}</p>
                 <div>Mobile: {connection.mobile.map(mob => (
                 <p key={mob}>{mob}</p>
             ))}</div>
                 </div>
             ))}</div>

            <br></br> 
             <div>opening: {coWorkingSpace.opening.map(open_close => (
                 <div key={open_close._id}>
                 <p>Open at: {open_close.open}</p>
                 <p>Close at: {open_close.close}</p>
                 </div>
             ))}</div>

             <br></br>
             <p>Notes: {coWorkingSpace.notes}</p>

      </div>
    );
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div >
            <button className= " btn btn-lg btn-block btn-outline-info " onClick = {this.changeShow}>{coWorkingSpace.name}</button>
            {this.state.show ? coWorkingSpaceData : undefined}
          </div>
         
        </div>
      </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

export default CoWorkingSpaceItem;
