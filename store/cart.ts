import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addItemToCart: (state, action: PayloadAction<any>) => {
      const itemInCart = state.items.find((i: any) =>
        i._id === action.payload._id &&
        i.selectedVariation?._id === action.payload.selectedVariation._id
      );

      if (!itemInCart) state.items.push(action.payload);
      else itemInCart.quantity = +itemInCart.quantity + 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItemFromCart: (state, action: PayloadAction<any>) => {
      if (action.payload && action.payload.variation) {
        const indexToRemove = state.items.findIndex((i: any) =>
          i._id === action.payload._id &&
          i.selectedVariation?._id === action.payload.selectedVariation._id
        );
        if (indexToRemove > -1) state.items.splice(indexToRemove, 1);
      } else {
        const indexToRemove = state.items.findIndex((i: any) =>
          i._id === action.payload._id
        );
        if (indexToRemove > -1) state.items.splice(indexToRemove, 1);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    setItemQuantity(state, action: PayloadAction<any>) {
      let itemInCart;

      if (action.payload.variation) {
        itemInCart = state.items.find((i: any) =>
          i._id === action.payload._id &&
          i.selectedVariation?._id === action.payload.selectedVariation._id
        );
      } else {
        itemInCart = state.items.find((i: any) =>
          i._id === action.payload._id
        );
      }

      if (!itemInCart) return;
      itemInCart.quantity = +action.payload.quantity;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    resetCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

// Rest of the code...

export default cartSlice.reducer;
