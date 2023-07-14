import { ProductIProps } from "@/models/Product";
import { addItemToCart, removeItemFromCart, resetCart, selectCartItems, setItemQuantity } from "@/store/cart";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const [cartProducts, setCartProducts] = useState<ProductIProps[]>([]);

  function addToCart(item: ProductIProps, quantity = 1) {
    dispatch(addItemToCart(item));
  }

  function removeCart(id: number) {
    dispatch(removeItemFromCart(id));
  }

  function clearCart() {
    dispatch(resetCart())
  }

  const updateQuantity = useCallback((item: ProductIProps, quantity: number) => {
    if (quantity < 1) return;

    item = { ...item, quantity }

    dispatch(setItemQuantity(item))
  }, [dispatch])

  const getQuantity = useCallback((item: ProductIProps) => {
      const itemInCart = cartItems.find(i => i.id === item.id);
      if (itemInCart) return itemInCart.quantity
  }, [cartItems])

  const isItemInCart = useCallback((item: ProductIProps) => {
    return cartItems.some(i => i.id === item.id);
  }, [cartItems])

  return {
    isItemInCart,
    getQuantity,
    updateQuantity,
    clearCart,
    removeCart,
    addToCart,
    cartItems,
    cartProducts,
  };
}
