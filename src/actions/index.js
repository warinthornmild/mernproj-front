import axios from 'axios';
import {
  FETCH_ITEMS,
  FETCH_ITEM,
  FETCH_SEARCHITEMS,
  POST_ORDER,
  ADDTO_CART,
  DELETE_CART,
  CLEAR_CART
} from './types';

export const fetchItems = () => async dispatch => {
  // const res = await axios.get('/item/get_all_items', { headers: {"Authorization" : `Bearer ${localStorage.token}`} });
  const res = await axios.get('/item/get_all_items');
  console.log('YEAH');
  console.log(res);
  dispatch({
    type: FETCH_ITEMS,
    payload: res.data
  });
};

export const fetchItem = id => async dispatch => {
  const res = await axios.get(`item/get_detail_item/${id}`);
  console.log(res.data);
  dispatch({
    type: FETCH_ITEM,
    payload: res.data
  });
};

export const fetchSearchItems = term => async dispatch => {
  console.log('term:' + term);
  const obj = { query: term };
  const res = await axios.post('item/search_items', obj);
  console.log('search items:', res);
  dispatch({
    type: FETCH_SEARCHITEMS,
    payload: res.data
  });
};

// export const fetchTypeItems = type => async dispatch => {
//   const res = await axios.post('/search_items', type);

//   dispatch({
//     type: FETCH_TYPEITEMS,
//     payload: res.data
//   });
// };

export const addToCart = (item, amount) => dispatch => {
  dispatch({
    type: ADDTO_CART,
    item: item,
    amount: amount
  });
};

export const deleteCart = id => dispatch => {
  dispatch({
    type: DELETE_CART,
    id: id
  });
};

export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART
  });
};

export const postOrder = list => async dispatch => {
  const res = await axios.post('/place_order', {});

  dispatch({
    type: POST_ORDER,
    status: res.data
  });
};

// export const fetchOrder = list => async dispatch => {
//   const res = await axios.get('');

//   dispatch({
//     type: POST_ORDER,
//     payload: res.data
//   });
// };
