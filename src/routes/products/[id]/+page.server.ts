// src/routes/products/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Product } from '$lib/data/products';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const response = await fetch(`/api/products/${params.id}`);
  if (!response.ok) {
    throw error(404, 'Product not found');
  }
  const product: Product = await response.json();
  return { product };
};