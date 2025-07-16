import { cups,type Product } from "$lib/data/products";
import { error } from "@sveltejs/kit";
import type { ServerLoad } from "@sveltejs/kit";

export const load:ServerLoad = async ({params}) => {

    const id  = params.id;
    
    const products: Product[] =cups;

    const product  = cups.find(p => p.id === id)
    
    if(!product){
        throw error(404, 'Product not found');
    }

    return {
        product,
        products
    };
}