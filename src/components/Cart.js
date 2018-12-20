import React, { Component } from 'react';
import axios from 'axios';
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

    const today = new Date();
    console.log(
      'today',
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    );

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const res = await axios.post(
      'http://localhost:5000/order/place_order',
      { orderList: orderArray, orderDated: today },
      config
    );

    if (res.data.message === 'Success') {
      localStorage.setItem('cart', JSON.stringify([]));
      this.props.history.push(`/cart`);
      alert('Thank you for your order!');
    } else alert('Order Failed.');
  };

  renderItem = obj => {
    const ID = obj.item._id;
    const name = obj.item.itemName;
    const price = obj.item.itemPrice;
    const amount = obj.amount;
    const pic = obj.item.itemPicture;
    const imurl = '/images/' + pic;

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
          className="card"
          style={{
            width: '18rem',
            margin: '10px 10px 10px 10px',
            color: '#4A4B4C'
          }}
        >
          <img className="card-img-top" src={imurl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">amount : {amount} pieces</p>
            <p className="card-text">Price : {price * amount} baht</p>
          </div>
        </div>
        <button
          className="btn btn-danger"
          style={{ margin: '10px' }}
          onClick={() => this.deleteCart(ID)}
        >
          Remove
        </button>
      </a>
    );
  };
  render() {
    console.log('cart:', this.props.cart);
    console.log('token:', localStorage.getItem('token'));

    localStorage.setItem('totalPrice', 0);

    return (
      <div style={{ padding: '20px' }}>
        <div
          className="item-list-container"
          style={{ color: '#4A4B4C' }}
          onClick={() => {}}
        >
          {_.map(JSON.parse(localStorage.getItem('cart')), this.renderItem)}
        </div>
        <div
          style={{
            textAlign: 'left',
            fontSize: '20px',
            color: '#4A4B4C',
            borderTop: '4ps solid grey'
          }}
        >
          <div> Total Price: {localStorage.getItem('totalPrice')} baht</div>
          <button
            className="btn btn-success btn-lg btn-block"
            style={{ margin: '10px', padding: '20px' }}
            onClick={() => {
              this.placeOrder();
            }}
          >
            order
          </button>
        </div>
      </div>
    );
  }
}

export default Cart;
