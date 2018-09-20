import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import categoryReducer from "./CategoryReducer";
import numPagesReducer from "./NumPagesReducer";
import CurrentPageReducer from "./CurrentPageReducer";

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  numPages: numPagesReducer,
  currentPage: CurrentPageReducer
});

 export default rootReducer;