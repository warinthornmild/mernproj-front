import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './mild.css';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = e => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async event => {
    event.preventDefault();

    console.log('HEYYY');
    const res = await axios.post('user/sign_in', {
      username: this.state.username,
      password: this.state.password
    });

    localStorage.setItem('token', res);
    localStorage.setItem('user', this.state.username);
    // localStorage.token = res;
    console.log(res);
    console.log(localStorage.getItem('token'));
    console.log('user:', localStorage.getItem('user'));
    if (res.statusText == 'OK') alert("You're already logged in");
    else alert('Username or Password are incorrect');
    window.location = '/';
    // this.props.history.push('/');
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div class="header-login">Log In</div>
        <form onSubmit={this.onFormSubmit}>
          <div
            class="form-row d-flex justify-content-center"
            style={{ paddingTop: '40px' }}
          >
            <div class="form-group ">
              <label for="exampleInputEmail1" style={{ textAlign: 'left' }}>
                Username
              </label>
              <br />
              <input
                type="username"
                name="username"
                value={username}
                class="form-control"
                id="exampleInputEmail1"
                style={{ width: '300px' }}
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div class="form-row d-flex justify-content-center">
            <div class="form-group">
              <label for="exampleInputPassword1" style={{ textAlign: 'left' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                class="form-control"
                id="exampleInputPassword1"
                style={{ width: '300px' }}
                placeholder="Password"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
            Not register?
            <a href="/signup"> Sign Up </a>
          </div>
          <div
            class="form-row d-flex justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <button type="login" class="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
