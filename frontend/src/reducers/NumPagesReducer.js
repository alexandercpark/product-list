import { FETCH_NUM_PAGES } from "../actions";


export default function(state = 1, action) {
  switch (action.type) {
    case FETCH_NUM_PAGES:
      return action.payload.data
    default:
      return state
  }
}