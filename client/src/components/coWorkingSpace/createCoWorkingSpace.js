import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createcoWorkingSpace } from '../../actions/coWorkingSpaceActions';

class CoWorkingSpaceRegister extends Component {
  constructor(props) {
    super(props);

   /* this.state = {
      name: 'aaaaaaa',
      email: 'aaaa@gmail.com',
      address: {
        link:'dfefd',
        zone:'fdfdfdf'
      },
      mobile:[],
      mobileNumber: '01224578965',
      social_media:'dfdfd',
      opening:[],
      opening_obj:{
        open:'5:00',
        close:'10:00'
      },
      connections:[],
      connections_obj:{
            mobile:'012245789654',
            name:'ddddddddd',
            notes:'daaaaaa'
      },
      notes:'sddddddddd',
      rooms:[],
      rooms_obj:{
        capacity:0,
          price:0,
          special_cases:'ssss',
          notes:'ssss',
          name:'ssssss'
      },
      errors: {}
    };*/
  
    this.state = {
      name: '',
      email: '',
      address: {
        link:'',
        zone:''
      },
      address_link:'',address_zone:'',
      mobile:[],
      mobileNumber: '',
      social_media:'',
      opening:[],
      opening_obj:{
        open:'',
        close:''
      },
      opening_obj_open:'',opening_obj_close:'',
      connections:[],
      connections_obj:{
            mobile:'',
            name:'',
            notes:''
      },
      connections_obj_mobile:'',connections_obj_name:'',connections_obj_notes:'',
      notes:'',
      rooms:[],
      rooms_obj:{
        capacity:'',
          price:'',
          special_cases:'',
          notes:'',
          name:''
      },
      rooms_obj_capacity:'',rooms_obj_price:'',rooms_obj_cases:'',rooms_obj_notes:'',rooms_obj_name:'',
      errors: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();

    const coWorkingSpaceData = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      mobile:this.state.mobile.concat([this.state.mobileNumber]),
      social_media:this.state.social_media,
      opening:this.state.opening.concat([this.state.opening_obj]),
      connections:this.state.connections.concat([this.state.connections_obj]),
      notes:this.state.notes,
      rooms:this.state.rooms.concat([this.state.rooms_obj])
    };
    console.log("...............................................");
    console.log(coWorkingSpaceData);
    this.props.createcoWorkingSpace(coWorkingSpaceData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="createcoWorkingSpace">
          <div className="container">
              <h1 className="text-center">Fill Co-Working-Space Data</h1>
              <form onSubmit={this.onSubmit} className="text-center">
                <div className="form-group" >
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div>{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div>{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="mobileNumber"
                    placeholder="mobileNumber"
                    name="mobileNumber"
                    value={this.state.mobileNumber}
                    onChange={this.onChange}
                  />
                  {errors.mobileNumber && (
                    <div >{errors.mobileNumber}</div>
                  )}
                </div>


                <div className="form-group">
                  <input
                    type="text"
                    placeholder="link"
                    name="address"
                    value={this.state.address.link}
                    onChange={this.onChange}
                  />
                  <input
                    type="text"
                    placeholder="zone"
                    name="address"
                    value={this.state.address.zone}
                    onChange={this.onChange}
                  />
                  {errors.address && (
                    <div >{errors.address}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="social media"
                    name="social_media"
                    value={this.state.social_media}
                    onChange={this.onChange}
                  />
                  {errors.social_media && (
                    <div >{errors.social_media}</div>
                  )}
                </div>
            
                <button type="submit" className="btn btn-secondary">Submit</button>
              </form>
            </div>
      </div>
    );
  }
}

CoWorkingSpaceRegister.propTypes = {
  createcoWorkingSpace: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { createcoWorkingSpace })(withRouter(CoWorkingSpaceRegister));
