import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul >
        <li >
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            <img
              src={user.avatar}
              alt={user.name}
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul >
        <li >
          <Link to="/register">
            Sign Up
          </Link>
        </li>
        <li >
          <Link to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav >
        <div>
          <Link  to="/">
            Events
          </Link>
          <button
            type="button"
          >
            <span />
          </button>

          <div >
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
