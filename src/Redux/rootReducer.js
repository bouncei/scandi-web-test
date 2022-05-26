import { combineReducers } from "redux";
import reducer from "./shop/reducer";

const rootReducer = combineReducers({
  shop: reducer,
});

export default rootReducer;
