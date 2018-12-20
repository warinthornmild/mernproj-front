import React, { Component } from 'react';
import { fetchSearchItems } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      isLogIn: 0
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user') != '') {
      this.setState({ isLogIn: 1 });
    }
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onLogOutClick() {
    localStorage.setItem('user', '');
    alert("You're already logged out");
    window.location = '/';
  }

  async onFormSubmit() {
    await this.props.fetchSearchItems(this.state.term);
    this.setState({ term: '' });
    // console.log('search items:' + this.props.items);
    this.props.history.push('/search');
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark justify-content-between"
        style={{ backgroundColor: '#FF6F61' }}
      >
        <a className="navbar-brand" href="/">
          {' '}
          MERN
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="col-md-10 form-inline"
          style={{ textAlign: 'left', display: 'inline' }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            value={this.state.term}
            onChange={e => this.onInputChange(e)}
            aria-label="Search"
            style={{ width: '350px' }}
          />

          <button
            className="btn btn-outline-light my-2 my-sm-0"
            type="submit"
            onClick={() => this.onFormSubmit()}
          >
            Search
          </button>
        </div>

        {this.state.isLogIn == 0 && (
          <a className="navbar-brand" href="/login">
            Log In
          </a>
        )}

        {this.state.isLogIn == 1 && (
          <div className="col-md-1">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
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
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="/cart">
                      Cart
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" onClick={this.onLogOutClick}>
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
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
