import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems } from '../actions/index';
import { fetchItem } from '../actions/index';
import _ from 'lodash';
import './mild.css';

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchItems();
    console.log('HEYYY');
  }

  renderItem(item) {
    const id = item._id;
    const name = item.itemName;
    const price = item.itemPrice;
    const date = item.itemReleased;
    // const pic = item.itemPicture;
    return (
      <a
        href="/item"
        style={{ textDecoration: 'none' }}
        onClick={name => this.props.fetchItem(id)}
      >
        <div
          class="card"
          style={{ width: '18rem', margin: '10px 10px 10px 10px' }}
        >
          <img class="card-img-top" src="" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <p class="card-text">Price : {price} baht</p>
            <p class="card-text">Released Date : {date.split('T')[0]}</p>
          </div>
        </div>
      </a>
    );
  }
  render() {
    console.log('items:', this.props.items);
    return (
      <div className="item-list-container" onClick={() => {}}>
        {_.map(this.props.items, this.renderItem)}
      </div>
    );
  }
}

function mapStateToProps({ items }) {
  return { items };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchItems, fetchItem }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList);
