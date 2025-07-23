// src/routes/api/products/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import { products } from '$lib/data/products';
import type { Product } from '$lib/data/products';

export async function GET({ params }) {
  const product = products.find((p:Product) => p.id === params.id);
  if (!product) {
    throw error(404, 'Product not found');
  }
  return json(product);
}