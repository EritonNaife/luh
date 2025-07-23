
import { products,type Product } from "$lib/data/products";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async () =>{
    const candles: Product[] =products;

    return{
        candles
    
    };
}