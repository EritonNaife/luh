<script lang="ts">
    import type {Product} from "$lib/data/products";
    import { selectedCurrency,formatPrice } from "$lib/stores/currency";
    import { goto } from "$app/navigation";
	import { quartOut } from "svelte/easing";
	import { fly } from "svelte/transition";

    export let product: Product;
    export let sectionCollections: boolean = false;
    
</script>

{#if sectionCollections}
  <a href={`/products/${product.id}`} class="product-card group flex-shrink-0 snap-center overflow-hidden flex flex-col w-48 md:w-64 lg:w-72 cursor-pointer" in:fly={{duration: 1800, y: 50, delay: 1000, easing: quartOut}}>

    <div class="aspect-[4/5] sm:aspect-[3/4] md:aspect-[3/2] lg:aspect-[16/9]">
      <img
        src={product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  
    <div class="py-4 space-y-2">
      <h3 class="text-lg lg:text-xl italic">{product.name}</h3>
      <p class="text-xs">{formatPrice(product.price,$selectedCurrency)}</p> 
    </div>
  </a>
{/if}
