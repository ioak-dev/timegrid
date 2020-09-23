import { RELOAD_EVENTS } from '../actions/types';

const initialState = {
  events: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RELOAD_EVENTS:
      console.log('RELOAD_EVENTS reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
