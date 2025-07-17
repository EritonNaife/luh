

import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { AnyProduct, CartItem } from '$lib/data/products';


// --- Store Definition ---

// Get the initial value from localStorage if in the browser, otherwise use an empty array.
const initialValue: CartItem[] = browser ? JSON.parse(window.localStorage.getItem('cart') || '[]') : [];

// Create the writable store.
const cart = writable<CartItem[]>(initialValue);

// If in the browser, subscribe to changes and update localStorage.
if (browser) {
  cart.subscribe((value) => {
    window.localStorage.setItem('cart', JSON.stringify(value));
  });
}

// --- Derived Stores (for easy calculations) ---

// A store that automatically calculates the total price of all items in the cart.
export const cartTotal = derived(cart, ($cart) => {
  return $cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
});

// A store that automatically calculates the total number of items in the cart.
export const itemCount = derived(cart, ($cart) => {
  return $cart.reduce((sum, item) => sum + item.quantity, 0);
});


// --- Cart Management Functions ---

/**
 * Adds a product to the cart. If the product is already in the cart,
 * its quantity is incremented.
 * @param {AnyProduct} product - The product to add.
 */
export const addToCart = (product: AnyProduct) => {
  cart.update((items) => {
    const itemIndex = items.findIndex((item) => item.productId === product.id);

    if (itemIndex !== -1) {
      // Item exists, so just update the quantity
      items[itemIndex].quantity += 1;
    } else {
      // Item doesn't exist, add it to the cart
      items.push({
        productId: product.id,
        product: product,
        quantity: 1
      });
    }
    return items;
  });
};

/**
 * Removes a product completely from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
export const removeFromCart = (productId: string) => {
  cart.update((items) => items.filter((item) => item.productId !== productId));
};

/**
 * Clears all items from the cart.
 */
export const clearCart = () => {
  cart.set([]);
};

// Expose the main cart store so components can subscribe to it.
export default cart;