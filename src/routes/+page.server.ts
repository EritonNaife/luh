
// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

export const load:PageServerLoad = async ({fetch}) => {
    const response = await fetch('/api/products?category=featured-cup');
    const featuredCups = await response.json();
    return { featuredCups };
  };