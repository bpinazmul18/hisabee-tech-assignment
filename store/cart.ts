import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./reducer";
import { ProductIProps } from "@/models/Product";

interface CartState {
  items: Array<any>;
}

const getInitialCartItems = (): Array<any> => {
  const cartItemsJson = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ProductIProps>) => {
      const itemInCart = state.items.find((i: ProductIProps) => i.id === action.payload.id );

      const newItem = {...action.payload, quantity: 1}

      if (!itemInCart) state.items.push(newItem);
      else itemInCart.quantity = +itemInCart.quantity + 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const indexToRemove = state.items.findIndex((i: ProductIProps) => i.id === action.payload );

      if (indexToRemove > -1) state.items.splice(indexToRemove, 1);

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    resetCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
    setItemQuantity(state, action: PayloadAction<ProductIProps>) {
      const itemInCart = state.items.find(i => i.id === action.payload.id);
      if (!itemInCart || action.payload.quantity === undefined) return;

      itemInCart.quantity = +action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addItemToCart, removeItemFromCart, setItemQuantity, resetCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.entities.cart.items;

export default cartSlice.reducer;
