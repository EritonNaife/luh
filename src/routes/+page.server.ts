
import { featuredProducts,type Product } from "$lib/data/products";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () =>{
    const products: Product[] =featuredProducts;

    return{
        products
    };
}