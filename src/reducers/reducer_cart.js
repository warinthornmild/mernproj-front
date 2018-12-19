import { ADDTO_CART, CLEAR_CART, DELETE_CART } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action) {
  if (action.type == ADDTO_CART) {
    console.log({
      item: action.item,
      amount: action.amount
    });
    return [
      {
        item: action.item,
        amount: action.amount
      },
      ...state
    ];
  }

  if (action.type == DELETE_CART) {
    const state2 = [];
    for (let i = 0; i < state.length; i++) {
      if (action.item.id == state[i].item.id);
      else state2 = [...state2, state[i]];
    }
    return state2;
  }

  if (action.type == CLEAR_CART) {
    return [];
  }

  return state;
}
