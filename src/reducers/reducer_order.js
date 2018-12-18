import { POST_ORDER } from '../actions/types';

export default function(state = [], action) {
  if (action.type == POST_ORDER) {
    return state;
  }

  return state;
}
