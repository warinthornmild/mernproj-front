import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearCart, deleteCart, postOrder } from '../actions/index';
import _ from 'lodash';
import './mild.css';

class Cart extends Component {
  deleteCart = async id => {
    console.log('heyyy');
    const itemArray = JSON.parse(localStorage.getItem('cart'));
    console.log(itemArray);
    const tmp = [];

    await _.map(itemArray, obj => {
      console.log(obj.item._id, id, obj.item._id == id);
      if (obj.item._id == id);
      else tmp.push(obj);
    });
    // console.log(tmp);
    localStorage.setItem('cart', JSON.stringify(tmp));

    this.props.history.push(`/cart`);
  };

  placeOrder = async () => {
    console.log('array cart', JSON.parse(localStorage.getItem('cart')));
    const itemArray = JSON.parse(localStorage.getItem('cart'));
    const orderArray = [];

    _.map(itemArray, obj => {
      for (let j = 0; j < obj.amount; j++) {
        orderArray.push(obj.item);
        console.log(JSON.stringify(orderArray));
      }
    });

    // for (let i = 0; i < itemArray.length; i++) {
    //   console.log('i=', i);
    //   for (let j = 0; j < itemArray[i].amount; i++) {
    //     orderArray.push(itemArray[i].item);
    //     console.log(JSON.stringify(orderArray));
    //   }
    // }

    const res = await axios.post('/place_order', { orderList: orderArray });

    // localStorage.setItem('cart', JSON.stringify([]));
  };

  renderItem = obj => {
    const ID = obj.item._id;
    const name = obj.item.itemName;
    const price = obj.item.itemPrice;
    const amount = obj.amount;
    // const pic = this.props.item.itemPicture;

    localStorage.setItem(
      'totalPrice',
      parseInt(localStorage.getItem('totalPrice')) +
        parseInt(price) * parseInt(amount)
    );

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
        <button onClick={() => this.deleteCart(ID)}>Remove</button>
      </a>
    );
  };
  render() {
    console.log('cart:', this.props.cart);
    localStorage.setItem('totalPrice', 0);

    return (
      <div className="item-list-container" onClick={() => {}}>
        {_.map(JSON.parse(localStorage.getItem('cart')), this.renderItem)}

        <p>Total Price : {localStorage.getItem('totalPrice')} baht</p>
        <button
          onClick={() => {
            this.placeOrder();
          }}
        >
          order
        </button>
      </div>
    );
  }
}

export default Cart;
