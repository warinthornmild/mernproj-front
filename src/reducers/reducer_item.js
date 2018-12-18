import { FETCH_ITEM } from '../actions/types';

export default function(state = [], action) {
  if (action.type == FETCH_ITEM) {
    return action.payload;
  }
  return state;
}
