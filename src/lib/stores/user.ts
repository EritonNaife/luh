import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

/**
 * Defines the shape of the authenticated user object.
 * You can add other properties like `name`, `avatarUrl`, etc.
 */
export interface User {	id: string;
	email: string;
}

/**
 * A writable store that holds the current user's data (`User` object)
 * or `null` if the user is not logged in.
 */
export const user: Writable<User | null> = writable(null);
