import { FETCH_ITEMS, FETCH_SEARCHITEMS } from '../actions/types';

export default function(state = [], action) {
  if (action.type == FETCH_ITEMS) {
    // return action.payload.data;
    return action.payload;
  }

  if (action.type == FETCH_SEARCHITEMS) {
    return action.payload;
  }
  return state;
}
