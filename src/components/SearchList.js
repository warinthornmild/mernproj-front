import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchItems, fetchItem } from '../actions/index';
import _ from 'lodash';
import './mild.css';

class SearchList extends Component {
  componentDidMount() {}

  onClickItem = async ID => {
    await this.props.fetchItem(ID);
    this.props.history.push(`/item`);
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
          classNamw="card"
          style={{ width: '18rem', margin: '10px 10px 10px 10px' }}
        >
          <img className="card-img-top" src={imurl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Price : {price} baht</p>
            <p className="card-text">Released Date : {date.split('T')[0]}</p>
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
