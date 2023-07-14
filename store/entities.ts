import { combineReducers } from "redux";

import cartReducer from './cart';
import categoriesReducer from './categories';

export interface RootState {
  cart: ReturnType<typeof cartReducer>;
  categories: ReturnType<typeof categoriesReducer>;
}

const rootReducer = combineReducers<RootState>({
  cart: cartReducer,
  categories: categoriesReducer,
});

export default rootReducer;
