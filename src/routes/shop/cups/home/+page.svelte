<script lang="ts">
	import Icon from "@iconify/svelte";
    import Card from "$lib/Components/Cards/Card.svelte";
    import {featuredCups} from "$lib/data/products";
	import { fly, scale } from "svelte/transition";


    
</script>





<main class="">

    <section id="hero-section " >

       <section class="hero-section" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }}>

        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]"  >
            <img src="/images/collections/cups_hero_section.png" alt="" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Home Collection</h1>
        </div>

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}} >
            <h2 class="text-2xl/8 font-light lg:text-2xl"> Bring the Forest Home</h2>
            <p class="text-center text-md/8 font-light lg:text-xl"> Ground yourself in nature’s finest: warm cedarwood, fresh eucalyptus, and rich vetiver to reconnect mind and space</p>
        </div>

    </section>
    

    </section>

    
    <section id="product-display" class="mt-10">
        
            <div class="flex justify-between w-full border-t-[1px] border-b-[1px]">
    
                <div class="p-2 w-[30%] flex justify-center">
                    <button class="">Filter</button>
                </div>
    
                <div class="p-2 w-[30%] border-l-[0.5px] flex justify-center">
                    <button class="flex items-center">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
                </div>
               
            </div>
            
            <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">

                {#each featuredCups as product}

                    <Card {product}/>
               
                {/each}
               
            </div>
    
    </section>

</main>
