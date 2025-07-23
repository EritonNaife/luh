import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { CartItem, Product } from '$lib/data/products';

// --- Helper Function to Fetch Product ---
async function fetchProduct(productId: string): Promise<Product | null> {
  if (!browser) return null; // Skip fetch in server-side context
  try {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

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

// A store that combines cart items with product details fetched from API.
export const cartWithProducts = derived(cart, ($cart, set: (value: (Product & { quantity: number })[]) => void) => {
  async function loadCartProducts() {
    const cartProducts = await Promise.all(
      $cart.map(async (item) => {
        const product = await fetchProduct(item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      })
    );
    set(cartProducts.filter((item): item is Product & { quantity: number } => item !== null));
  }
  if (browser) {
    loadCartProducts();
  } else {
    set([]);
  }
}, [] as (Product & { quantity: number })[]);

// A store that calculates the total price of all items in the cart.
export const cartTotal = derived(cart, ($cart, set: (value: number) => void) => {
  async function calculateTotal() {
    const total = await $cart.reduce(async (sumPromise, item) => {
      const sum = await sumPromise;
      const product = await fetchProduct(item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, Promise.resolve(0));
    set(total);
  }
  if (browser) {
    calculateTotal();
  } else {
    set(0);
  }
}, 0);

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