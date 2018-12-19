import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, fetchItem } from '../actions/index';
import _ from 'lodash';
import './mild.css';

class SearchList extends Component {
  componentDidMount() {}

  onClickItem = async ID => {
    console.log('dsfsdfsd');

    const res = await this.props.fetchItem(ID);
    console.log(res);
    this.props.history.push(`/${ID}`);
  };

  renderItem(item, idx) {
    const ID = item._id;
    const name = item.itemName;
    const price = item.itemPrice;
    const date = item.itemReleased;
    const pic = item.itemPicture;
    const imurl = '/images/' + pic;
    return (
      <a
        // href="/item"
        style={{ textDecoration: 'none' }}
        onClick={() => this.onClickItem(ID)}
        key={idx}
      >
        <div
          class="card"
          style={{ width: '18rem', margin: '10px 10px 10px 10px' }}
        >
          <img class="card-img-top" src={imurl} alt="Card image cap" />
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
      <div
        className="item-list-container"
        onClick={() => {
          this.props.fetchItem();
        }}
      >
        {_.map(this.props.items, (item, idx) => this.renderItem(item, idx))}
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
)(SearchList);
