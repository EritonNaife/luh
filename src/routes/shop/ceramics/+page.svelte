<script>
	import { fly, scale } from "svelte/transition";
    import { ceramicCandles } from "$lib/data/products";
	import Card2 from "$lib/Components/Cards/Card2.svelte";
	import Icon from "@iconify/svelte";

</script>

<main class="text-[#333333]">

    <section id="Hero-section" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }}>
        
        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]"  >
            <img src="/images/collections/ceramic_hero_section.png" alt="" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Ceramic Collection</h1>
        </div>

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}} >
            <h2 class="text-2xl/8 font-light lg:text-2xl">Handcrafted Ceramic Candles</h2>
            <p class="text-center text-md/8 font-light lg:text-xl">
                Elevate your space with our artisan-made candles — a blend of natural scents and timeless ceramic design.
            </p>

        </div>

    </section>


    <section id="product-display" class="mt-10">
        
        <div class="flex justify-end items-center mr-10">

            <div class="">
                <button class="py-1 px-3 hover:font-bold">Filter</button>
            </div>

            <div class="">
                <button class="flex items-center py-1 px-3 py-1 px-3 hover:font-bold">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
            </div>
           
        </div>
        
        <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">

            {#each ceramicCandles as product}

                <Card2 {product}/>
           
            {/each}
           
        </div>

</section>

</main>