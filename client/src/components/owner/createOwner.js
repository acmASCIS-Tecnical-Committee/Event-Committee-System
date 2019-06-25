import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createOwner } from '../../actions/ownerActions';

class OwnerRegister extends Component {
  constructor(props) {
    super(props);

   this.state = {
      name: 'aaaaaaa',
      email: 'aaa@gmail.com',
      mobile: [], 
      mobile_number:'01224578541',
      social_media:'www.facebook.com',
     
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

    const OwnerData = {
      name: this.state.name,
      email : this.state.email,
      mobile : this.state.mobile.concat([this.state.mobile_number]),
      social_media:this.state.social_media
    };

    this.props.createOwner(OwnerData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="cteateowner">
          <div className="container">
              <h1 className="text-center">Fill Owner Data</h1>
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

            
                <button type="submit" className="btn btn-secondary">Submit</button>
              </form>
            </div>
      </div>
    );
  }
}

// StoreRegister.propTypes = {
//   createStore: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { createOwner })(withRouter(OwnerRegister));
