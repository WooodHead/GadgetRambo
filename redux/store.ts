import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cart/cart.reducer";
import { authReducer } from "./auth/auth.reducer";
import productsReducer from "./products/products.reducer";
import newsReducer from "./news/news.reducer";

const rootReducer = combineReducers({
  productsManager: productsReducer,
  cartManager: cartReducer,
  authManager: authReducer,
  newsManager: newsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export const storeType = typeof store;

export type State = ReturnType<typeof rootReducer>;
