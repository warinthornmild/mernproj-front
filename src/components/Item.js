import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './mild.css';
import { addToCart } from '../actions';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const ID = this.props.item._id;
    const name = this.props.item.itemName;
    const price = this.props.item.itemPrice;
    const date = this.props.item.itemReleased;
    const pic = this.props.item.itemPicture;
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="#">Type</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Item
            </li>
          </ol>
        </nav>

        <div class="left-col">
          <img src="1040518_in_pp.jpg" />
        </div>

        <div class="right-col">
          <h4 style={{ paddingLeft: '20px', padding: '10px' }}>Detail:</h4>
          <div style={{ position: 'absolute', bottom: '0' }}>
            <input
              type="number"
              id="amount"
              name="amount"
              min="1"
              style={{ width: '100px', margin: '25px' }}
              onChange={this.onChange}
            />
            <button
              class="btn btn-success"
              type="button"
              style={{ paddingLeft: '20px' }}
              onClick={this.props.addToCart(this.props.item, this.state.amount)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToCart }, dispatch);
}

function mapStateToProps({ item }) {
  return { item };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
