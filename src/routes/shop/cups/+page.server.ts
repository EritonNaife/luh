import { cups,type Product } from "$lib/data/products";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () =>{
    const products: Product[] =cups;

    return{
        products
    };
}