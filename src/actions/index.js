import axios from 'axios';
import { FETCH_ITEMS, FETCH_ITEM, FETCH_SEARCHITEMS } from './types';

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
  console.log('gggg');
  const res = await axios.get(
    `http://localhost:5000/item/get_detail_item/${id}`
  );
  console.log(`id :  ${id}`);
  console.log('res', res.data);
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
