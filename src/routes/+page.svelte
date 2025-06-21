<script lang="ts">
    import Collection from "$lib/Components/Cards/Collection.svelte";
    import ProductCard from "$lib/Components/Cards/ProductCard.svelte";
    import ProductSlider from "$lib/Components/Slider/ProductSlider.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
	import { fade, fly, slide } from "svelte/transition";
	import { cubicIn, quartOut } from "svelte/easing";

    function handleClick(){
        goto('/products');
    }
    
    export let data:PageData;
    
</script>


<main>
    
    <section id="Hero-section" in:fade={{duration: 2000, delay: 50 ,easing: quartOut}}>
		
        <div class="relative bg-cover bg-center h-screen flex flex-col items-center justify-end text-center" style="background-image: url('images/Gemini_Generated_Image_ue7vpkue7vpkue7v.jpeg')">

            <div class="absolute inset-0 bg-black/40 "></div>

            <div class="absolute bottom-30 text-white mb-5 md:right-30 md:top-90" in:fly={{duration:800, x: 30 ,easing:cubicIn}}>

                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Your Awesome Headline</h1>
                <p class="text-md md:text-xl lg:text-2xl max-w-2xl">A compelling description or call to action.</p>
                <button class="mt-8 py-1 px-3 bg-white text-black hover:bg-black hover:text-white font-semibold lg:py-3 lg:px-6 rounded-md">Learn More</button>

            </div>

        </div>

    </section>
   
	 
    <section id="Latest-products" class="p-4">
    
        <div class="flex justify-center gap-4 p-4">
            <h2 class="text-2xl lg:text-3xl font-medium ">You might like</h2>
        </div>
        
        <ProductSlider/>
    </section>
    
    <section id="Collections-section" class="mb-20">
      
            <h2 class="p-4 text-2xl text-center lg:text-3xl bg-[#fae0df]">Collections</h2>
    
            <div class="py-4 space-y-2 grid justify-items-center grid-cols-2 lg:flex justify-center lg:gap-4">
                <Collection link="shop/collections/earth" url="images/earth-collection-candle.jpeg" caption="Earth"/>
                <Collection link="shop/collections/calm" url = "images/calm-collection-candle.jpeg" caption="Calm"/>
                <Collection link="shop/collections/gift" url = "images/gift-collection-candle.jpeg" caption="Gift"/>
                <Collection link="shop/collections/mood" url="images/mood-collection-candle.jpeg" caption="Mood"/>
                
            </div>
    
    </section>
  
</main>

<style>
	@media screen and (min-width: 500px) {
		:global(#slidy_cards .slidy-ul li) {width: 70vw;}
	}	
	@media screen and (min-width: 600px) {
		:global(#slidy_cards .slidy-ul li) {width: 50vw;}
	}
	@media screen and (min-width: 700px) {
		:global(#slidy_cards .slidy-ul li) {width: 33vw;}
	}
	:global(#slidy_cards .slidy-ul li img) {
			transform: scale(1);
			transition: transform 350ms, box-shadow 350ms;
	}
	:global(#slidy_cards .slidy-ul li) {overflow: visible}
	:global(#slidy_cards .slidy-ul li.active img) {
			transform: scale(1.15);
			box-shadow: 0 14px 25px rgba(0, 0, 0, 0.36);
	}
	:global(body) { margin: 0; padding: 0}
	.slide {
		position: relative;
		display: flex;
		flex-flow: column;
		text-align: center;
		align-content: center;
		justify-content: center;
		height: 100%;
		border-radius: 1rem;
	}
	.slide img {
		max-height: 200px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		vertical-align: middle;
		object-fit: cover;
		position: relative;
		z-index: 1;
		border-radius: 1rem;
		box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
	}
	.slide article {
		padding: 1rem;
	}
</style>
