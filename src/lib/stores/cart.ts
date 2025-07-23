import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { products } from '$lib/data/products';
import type { CartItem, Product } from '$lib/data/products';

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

// --- Derived Stores ---

// A store that combines cart items with product details.
export const cartWithProducts = derived(cart, ($cart) =>
  $cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter((item): item is Product & { quantity: number } => item !== null)
);

// A store that calculates the total price of all items in the cart.
export const cartTotal = derived(cart, ($cart) => {
  return $cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
});

// A store that calculates the total number of items in the cart.
export const itemCount = derived(cart, ($cart) => {
  return $cart.reduce((sum, item) => sum + item.quantity, 0);
});

// --- Cart Management Functions ---

/**
 * Adds a product to the cart. If the product is already in the cart,
 * its quantity is incremented.
 * @param productId - The ID of the product to add.
 * @param quantity - The quantity to add (default: 1).
 */
export const addToCart = (productId: string, quantity: number = 1) => {
  cart.update((items) => {
    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex !== -1) {
      // Item exists, update the quantity
      items[itemIndex].quantity += quantity;
    } else {
      // Item doesn't exist, add it to the cart
      items.push({ productId, quantity });
    }
    return [...items];
  });
};

/**
 * Removes a product completely from the cart.
 * @param productId - The ID of the product to remove.
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

/**
 * Increases the quantity of a product in the cart by one.
 * @param productId - The ID of the product to update.
 */
export const increaseQuantity = (productId: string) => {
  cart.update((items) => {
    const itemIndex = items.findIndex((item) => item.productId === productId);
    if (itemIndex !== -1) {
      items[itemIndex].quantity++;
    }
    return [...items];
  });
};

/**
 * Decreases the quantity of a product in the cart. If the quantity
 * reaches zero, the item is removed.
 * @param productId - The ID of the product to update.
 */
export const decreaseQuantity = (productId: string) => {
  cart.update((items) => {
    const itemIndex = items.findIndex((item) => item.productId === productId);
    if (itemIndex !== -1 && items[itemIndex].quantity > 1) {
      items[itemIndex].quantity--;
    } else if (itemIndex !== -1) {
      // If quantity is 1, remove the item
      items.splice(itemIndex, 1);
    }
    return [...items];
  });
};

// Expose the main cart store so components can subscribe to it.
export default cart;