import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";



let reducers = combineReducers({
    categoriesProducts: productsReducer,
    cart: cartReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;