<script lang="ts">
    import type {Product} from "$lib/data/products";
    import { selectedCurrency,formatPrice } from "$lib/stores/currency";
    import { goto } from "$app/navigation";

    export let product: Product;
    
    function handleClick(){
        goto(`/products/${product.id}`);
    }
</script>

<div class="product-card flex-shrink-0 snap-center overflow-hidden flex flex-col w-48 lg:w-56 md:w-64 lg:w-72 ">

    <div class="aspect-[4/5] sm:aspect-[3/4] md:aspect-[3/2] lg:aspect-[16/9]">
      <img
        src={product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        on:click={handleClick}
      />
    </div>
   
    <div class="py-4 space-y-2">
      <h3 class="text-lg lg:text-xl italic">{product.name}</h3>
      <p class="text-xs">{formatPrice(product.price,$selectedCurrency)}</p> 
    </div>
</div>
