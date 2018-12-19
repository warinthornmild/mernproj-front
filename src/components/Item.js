import React, { Component } from 'react';
import { connect } from 'react-redux';
import './mild.css';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
  }

  onClickSubmit = () => {
    if (localStorage.getItem('user') == '') {
      alert('You have to login first!');
      window.location = '/login';
    } else {
      const item = { item: this.props.item, amount: this.state.amount };
      const itemArray = JSON.parse(localStorage.getItem('cart'));
      itemArray.push(item);
      localStorage.setItem('cart', JSON.stringify(itemArray));

      console.log('cart', JSON.parse(localStorage.getItem('cart')));
      alert('Go to cart to see your order!');
      window.location = '/cart';

    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const ID = this.props.item._id;
    const name = this.props.item.itemName;
    const price = this.props.item.itemPrice;
    const date = this.props.item.itemReleased;
    const desc = this.props.item.itemDesc;
    const pic = this.props.item.itemPicture;
    const amountItem = this.props.item.itemAmount;
    const imurl = '/images/' + pic;
    return (
      <div >
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Item
            </li>
          </ol>
        </nav>

        <div class="left-col" style={{ color: "#6F7073" }}>
          <img class="card-img-top" src={imurl} alt="Card image cap" />
        </div>

        <div class="right-col" style={{ color: "#6F7073" }}>
          <h4 style={{ paddingLeft: '30px', padding: '10px' }}>Detail:</h4>
          <div
            class="card"
            style={{ width: '18rem', margin: '10px 10px 10px 10px' }}
          >
            <div class="card-body" >
              <h5 class="card-title">{name}</h5>
              <p class="card-text">Price : {price} baht</p>
              <p class="card-text">Description: {desc} </p>
              <p class="card-text">Released Date : {date.split('T')[0]}</p>
              {amountItem > 0 && <p class="card-text">Status : Avaliable</p>}
              {amountItem < 1 && <p class="card-text">Status : Sold Out</p>}
            </div>
          </div>
          <div style={{ position: 'absolute' }}>
            <input
              type="number"
              id="amount"
              name="amount"
              min="0"
              max={amountItem}
              defaultValue="0"
              style={{ width: '100px', margin: '25px' }}
              onChange={this.onChange}
            />
            <button
              class="btn btn-success"
              type="button"
              className={
                amountItem > 0
                  ? 'btn btn-success map-button'
                  : 'btn btn-secondary map-button'
              }
              disabled={amountItem > 0 ? '' : 'true'}
              onClick={() => this.onClickSubmit()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ item }) {
  return { item };
}

export default connect(mapStateToProps)(Item);
