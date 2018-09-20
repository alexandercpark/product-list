import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import categoryReducer from "./CategoryReducer";

 const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer
});
 export default rootReducer;