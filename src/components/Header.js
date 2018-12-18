import React, { Component } from 'react';
import { fetchSearchItems } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  async onFormSubmit() {
    await this.props.fetchSearchItems(this.state.term);
    this.setState({ term: '' });
    // console.log('search items:' + this.props.items);
    // this.props.history.push('/search');
  }
  componentWillReceiveProps(props) {
    // console.log('xxxczxc', props);
  }
  render() {
    return (
      <nav
        class="navbar navbar-expand-lg navbar-dark justify-content-between"
        style={{ backgroundColor: '#FF6F61' }}
      >
        <a class="navbar-brand" href="/">
          {' '}
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div class="col-md-10" style={{ textAlign: 'right' }}>
          {/* <form class="form-inline my-2 my-lg-0"> */}
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            value={this.state.term}
            onChange={e => this.onInputChange(e)}
            aria-label="Search"
            style={{ width: '350px' }}
          />

          <button
            class="btn btn-outline-light my-2 my-sm-0"
            type="submit"
            backgroundColor="#FFFFFF"
            onClick={() => this.onFormSubmit()}
          >
            Search
          </button>
          {/* </form> */}
        </div>

        <div class="col-md-1">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <a class="dropdown-item" href="#">
                    Profile
                  </a>
                  <a class="dropdown-item" href="#">
                    Order
                  </a>
                  <a class="dropdown-item" href="#">
                    History
                  </a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    Log Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSearchItems }, dispatch);
}
function mapStateToProps({ items }) {
  return { items };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));