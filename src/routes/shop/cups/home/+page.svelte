<script lang="ts">
    
	import Icon from "@iconify/svelte";
    import Card from "$lib/Components/Cards/Card.svelte";
	import { fly, scale } from "svelte/transition";
	import { onMount } from "svelte";
    import type { Product } from '$lib/data/products';

    let cups :Product[] = [];

    onMount(async () => {
        const response = await fetch('/api/products?category=cup');
        cups = await response.json();
  });
</script>






<main class="">

    <section id="hero-section" class="text-[#6B6B6B]" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }}>
        
        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]"  >
            <img src="/images/collections/cups_hero_section.png" alt="" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Home Collection</h1>
        </div>

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}} >
            <h2 class="text-2xl lg:text-3xl"> Bring the Forest Home</h2>
            <p class="text-center lg:text-lg"> Ground yourself in nature’s finest: warm cedarwood, fresh eucalyptus, and rich vetiver to reconnect mind and space</p>
        </div>

    </section>

    
    <section id="product-display" class="mt-10">
        
            <div class="flex justify-end items-center mr-10 text-xs lg:text-base">
    
                <div class="">
                    <button class="py-1 px-3 hover:font-bold">Filter</button>
                </div>
    
                <div class="">
                    <button class="flex items-center py-1 px-3 py-1 px-3 hover:font-bold">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
                </div>
               
            </div>
            
            <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">

                {#each cups as product}

                    <Card {product}/>
               
                {/each}
               
            </div>
    
    </section>

</main>
