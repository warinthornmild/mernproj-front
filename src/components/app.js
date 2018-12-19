import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ItemList from './ItemList';
import Item from './Item';
import SearchList from './SearchList';
import Header from './Header';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Cart from './Cart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={ItemList} />
            {/* <Route exact path="/item" component={Item} /> */}
            <Route exact path="/search" component={SearchList} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/item" component={Item} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
