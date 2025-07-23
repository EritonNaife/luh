<script lang="ts">
    import SlidingOption from "../SlidingMenus/SlidingOption.svelte";
    import type { Product } from "$lib/data/products";
    import { selectedCurrency,formatPrice } from "$lib/stores/currency";
	import Icon from "@iconify/svelte";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
    
    export let product:Product;

    let isSizeOptions = false;
    let hovered = false;


    function toggleSizeOptions(){
        isSizeOptions = !isSizeOptions;
    }

    function handleClick(){
        
        goto(`/products/${product.id}`);
        

    }



</script>


<div class="card flex flex-col gap-2 group cursor-pointer text-[#6B6B6B]">

    <div
        class="relative w-[45vw] h-[30vh] sm:w-[46vw] sm:h-100 md:w-[31vw] md:h-[30vh] lg:w-[24vw] lg:h-[40vh] overflow-hidden"
        on:click={handleClick}
        on:mouseenter={() => (hovered = true)}
        on:mouseleave={() => (hovered = false)}
    >
            {#if hovered}
            <img
                class="absolute top-0 left-0 w-full h-full object-cover"
                src={product.imageUrls[1]}
                alt={product.name}
                transition:fade={{ duration: 600 }}
            />
        {:else}
            <img
                class="absolute top-0 left-0 w-full h-full object-cover"
                src={product.imageUrls[0]}
                alt={product.name}
                transition:fade={{ duration: 600 }}
            />
        {/if}

        <div class="absolute z-10 bottom-2 right-2">
            <div
                class="bg-white transition-transform duration-300 group-hover:-translate-y-2"
                on:click|stopPropagation={toggleSizeOptions}
            >
                <Icon icon="mynaui:plus" class="size-7 transition-transform duration-200 hover:rotate-90" />
            </div>
        </div>
    </div>

    <footer>
        <h3 class="italic">{product.name}</h3>
        <p class="text-sm">{formatPrice(product.price,$selectedCurrency)}</p>
    </footer>
</div>




{#if isSizeOptions }
<SlidingOption {product} closeMenu = {() => (isSizeOptions = false)}/>
{/if}
