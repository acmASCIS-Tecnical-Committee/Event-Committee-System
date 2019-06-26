import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createMaterial } from '../../actions/materialsActions';

class MaterialRegister extends Component {
  constructor(props) {
    super(props);

   this.state = {
      name: 'ballons',
      notes: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
      providers: [], 
     
     providerobj : {store_id:  "5d11f58d0d724c198c59712f" , price:"102"},
     
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

    const materialData = {
      name: this.state.name,
      notes : this.state.notes,
      providers : this.state.providers.concat([this.state.providerobj])
    };
  //  console.log("...............................................");
  //  console.log(StoreData);
    this.props.createMaterial(materialData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="cteatestore">
          <div className="container">
              <h1 className="text-center">Fill Material Data</h1>
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

export default connect(mapStateToProps, { createMaterial })(withRouter(MaterialRegister));
