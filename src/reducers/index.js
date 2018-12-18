import { combineReducers } from 'redux';
import itemsReducer from './reducer_items';
import itemReducer from './reducer_item';
import cartReducer from './reducer_cart';
import orderReducer from './reducer_order';

var reducers = combineReducers({
  items: itemsReducer,
  item: itemReducer,
  cart: cartReducer,
  order: orderReducer
});

export default reducers;
