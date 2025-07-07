import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Product } from '$lib/data/products';

/**
 * Defines the core properties of a product.
 * You can expand this with more details like `imageUrl`, `description`, etc.
 */

/**
 * Represents a product within the shopping cart, extending the base Product
 * with a quantity.
 */
export interface CartItem extends Product {
	quantity: number;
}

/**
 * Creates a custom store for managing the shopping cart.
 * The store holds an array of CartItem objects and provides methods
 * for safe manipulation.
 */
function createCart() {
	const { subscribe, set, update }: Writable<CartItem[]> = writable([]);

	return {
		subscribe,
		/** Add an item to the cart or update its quantity if it already exists. */
		addItem: (product: Product) => {
			update((items) => {
				const itemIndex = items.findIndex((i) => i.id === product.id);

				if (itemIndex > -1) {
					items[itemIndex].quantity++;
				} else {
					items.push({ ...product, quantity: 1 });
				}
				return items;
			});
		},
		/** Remove an item from the cart by its ID. */
		removeItem: (productId: string) => {
			update((items) => items.filter((item) => item.id !== productId));
		},
		/** Clear all items from the cart. */
		clear: () => set([])
	};
}

export const cart = createCart();