import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearCart, deleteCart, postOrder } from '../actions/index';
import _ from 'lodash';
import './mild.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { orderlist: [], totalPrice: 0 };
  }

  componentDidMount() {}

  renderItem = obj => {
    const ID = obj.item._id;
    const name = obj.item.itemName;
    const price = obj.item.itemPrice;
    const amount = obj.amount;
    // const pic = this.props.item.itemPicture;
    for (let i = 0; i < amount; i++) {
      this.setState({ orderlist: [obj.item, ...this.state.orderlist] });
    }
    this.setState({ totalPrice: this.state.totalPrice + price * amount });

    return (
      <a
        // href="/:id"
        style={{ textDecoration: 'none' }}
        // onClick={name => this.props.fetchItem(id)}
      >
        <div
          class="card"
          style={{ width: '18rem', margin: '10px 10px 10px 10px' }}
        >
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <p class="card-text">amount : {amount} baht</p>
            <p class="card-text">Price : {price * amount} baht</p>
          </div>
        </div>
        <a href="/cart" class="btn btn-info btn-lg">
          <span
            class="glyphicon glyphicon-remove"
            onClick={() => this.props.deleteCart(ID)}
          />
          Remove
        </a>
      </a>
    );
  };
  render() {
    console.log('cart:', this.props.cart);

    return (
      <div className="item-list-container" onClick={() => {}}>
        {_.map(this.props.cart, this.renderItem)}

        <p>Total Price : {this.state.totalPrice} baht</p>
        <button
          onClick={() => {
            this.props.postOrder(this.state.orderlist);
            this.props.clearCart();
          }}
        >
          order
        </button>
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return { cart };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearCart, deleteCart, postOrder }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
