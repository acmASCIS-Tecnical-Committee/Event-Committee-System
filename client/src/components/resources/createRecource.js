import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createResource } from '../../actions/resourceActions';

class ResourceRegister extends Component {
  constructor(props) {
    super(props);

   this.state = {
      name: 'aaaaaaa',
      details: 'some details',
      owner: [], 
     
     owneronbj : {ownerId : "5d1205754e9cb11e4883cbd5"},
     
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

    const resourceData = {
      name: this.state.name,
      details : this.state.details,
      owner : this.state.owner.concat([this.state.owneronbj])
    };
  //  console.log("...............................................");
  //  console.log(StoreData);
    this.props.createResource(resourceData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="cteatestore">
          <div className="container">
              <h1 className="text-center">Fill Resource Data</h1>
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

export default connect(mapStateToProps, { createResource })(withRouter(ResourceRegister));
