<script lang="ts">
    import SlidingOption from "../SlidingMenus/SlidingOption.svelte";
    import type { Product } from "$lib/data/products";
    import { selectedCurrency,formatPrice } from "$lib/stores/currency";
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
    export let product:Product;

    let isSizeOptions = false;
  


    function toggleSizeOptions(){
        isSizeOptions = !isSizeOptions;
    }

    function handleClick(){
        goto(`/products/${product.id}`);
    }


</script>


<div class="card flex flex-col gap-2 group cursor-pointer text-[#737373]">

    <div
       class="w-[45vw] h-[30vh] sm:w-[46vw] sm:h-100 md:w-[31vw] md:h-[30vh] 
              lg:w-[24vw] lg:h-[40vh] p-2 relative bg-cover bg-center flex justify-end items-end" 
       style="background-image: url('{product.imageUrl}');"
       on:click={handleClick}
    >

    
       
        <div class="bg-white transition-transform duration-300 group-hover:-translate-y-2 "on:click|stopPropagation = {toggleSizeOptions}>
            <Icon icon = "mynaui:plus" class="size-7 transition-transform duration-200 hover:rotate-90" />
        </div>
    </div>

    <footer>
        <h3>{product.name}</h3>
        <p>{formatPrice(product.price,$selectedCurrency)}</p>
    </footer>
</div>




{#if isSizeOptions }
<SlidingOption {product} closeMenu = {() => (isSizeOptions = false)}/>
{/if}
