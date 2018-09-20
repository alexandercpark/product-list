import { FETCH_PRODUCTS } from "../actions";


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data
    default:
      return state
  }
}