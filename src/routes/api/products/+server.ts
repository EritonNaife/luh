// src/routes/api/products/+server.ts
import { json } from '@sveltejs/kit';
import { products } from '$lib/data/products';
import type { Product } from '$lib/data/products';

export async function GET({ url }) {
  const category = url.searchParams.get('category');
  if (category) {
    const filteredProducts = products.filter(
      (p:Product) => p.category === category
    );
    return json(filteredProducts);
  }
  return json(products);
}