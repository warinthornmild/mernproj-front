import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './mild.css';

class SignUp extends Component {
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
    console.log('dsfsdfsd');

    const res = await axios.post('/user/sign_up', {
      username: this.state.username,
      password: this.state.password
    });
    console.log(res);
    this.props.history.push('/login');
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div class="header-login">Sign Up</div>
        <form>
          <div
            class="form-row d-flex justify-content-center"
            style={{ textAlign: 'center', paddingTop: '60px' }}
          >
            <div class="form-group ">
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
          <div
            class="form-row d-flex justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <div class="form-group">
              <input
                type="password"
                name="password"
                value={password}
                class="form-control"
                id="exampleInputPassword1"
                style={{ width: '300px' }}
                placeholder="Password"
                required="required"
                onChange={this.onChange}
              />
            </div>
          </div>

          <div
            class="form-row d-flex justify-content-center"
            style={{ textAlign: 'center' }}
          >
            <button
              type="signup"
              class="btn btn-primary"
              onClick={() => this.onFormSubmit()}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
