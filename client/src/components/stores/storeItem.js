import React, { Component } from 'react';
// import PropTypes from './node_modules/prop-types';
// import { Link } from './node_modules/react-router-dom';
import isEmpty from '../../validation/is-empty';

class StoreItem extends Component {
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
    const { store } = this.props;
    const storeData = (
      <div >
        <p>{store.name}</p>  
            <br></br> 
             <div>Mobiles: {store.mobile.map(mobile => (
                 <div key={mobile}>
                 <p>{mobile}</p>
                </div>
             ))}</div>
             <br></br>
             <a href={store.link}>{store.zone}</a>
             <br></br> 
             <div>opening: {store.opening.map(open_close => (
                 <div key={open_close._id}>
                 <p>Open at: {open_close.open}</p>
                 <p>Close at: {open_close.close}</p>
                 </div>
             ))}</div>
             <p>Last Update: {store.update}</p>
             <p>Notes: {store.notes}</p>

      </div>
    );
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div >
            <button className= " btn btn-lg btn-block btn-outline-info " onClick = {this.changeShow}>{store.name}</button>
            {this.state.show ? storeData : undefined}
          </div>
         
        </div>
      </div>
    );
  }
}

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired
// };

export default StoreItem;
