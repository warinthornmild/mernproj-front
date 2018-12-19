import { combineReducers } from 'redux';
import itemsReducer from './reducer_items';
import itemReducer from './reducer_item';

var reducers = combineReducers({
  items: itemsReducer,
  item: itemReducer
});

export default reducers;
