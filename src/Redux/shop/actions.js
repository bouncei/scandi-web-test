export function addProductToCart(product) {
  return {
    type: "ADD_PRODUCT_TO_CART",
    payload: {
      product: product,
    },
  };
}

export function removeProductFromCart(product) {
  return {
    type: "REMOVE_PRODUCT_FROM_CART",
    payload: {
      productToRemove: product,
    },
  };
}

export function setMiniCartIsOpen() {
  return {
    type: "SET_MINI-CART_IS_OPEN",
  };
}

export function checkout() {
  return {
    type: "CHECKOUT",
  };
}
