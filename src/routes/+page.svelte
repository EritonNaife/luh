<script lang="ts">
    import Collection from "$lib/Components/Cards/Collection.svelte"
    import ProductSlider from "$lib/Components/Slider/ProductSlider.svelte";
    import { inview } from 'svelte-inview';
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { fade, fly} from "svelte/transition";
    import { cubicIn, quartOut } from "svelte/easing";

    function handleClick(){
        goto('/products');
    }
    
	
    export let data:PageData;


    let isInView: boolean = false;
	let sectionLatestProducts: boolean = false;
	let sectionCollections: boolean = false;

    
    // State for controlling section visibility
    let latestProductsVisible = false;
    let collectionsVisible = false;

	const handleInViewChange = (event: CustomEvent) => {
        const { inView } = event.detail;
        isInView = inView;
    };
 
</script>

<main class="text-[#2F2F2F]">
    

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
   
    <section id="Latest-products" class="p-4" use:inview={{threshold: 0.3, rootMargin: '0px', unobserveOnEnter: true}} on:inview_change={handleInViewChange} >
        {#if isInView}
		<div 
		class="flex justify-center gap-4 p-4"
		in:fly={{duration: 1600, y: 50, delay: 400, easing: quartOut}}
	>
		<h2 class="text-2xl lg:text-3xl font-medium">You might like</h2>
	</div>
	
	<div in:fade={{duration: 1600, delay: 800, easing: quartOut}}>
		<ProductSlider/>
	</div>
        {/if}
    </section>
    
    <section 
        id="Collections-section" 
        class="mb-20"
        use:inview={{threshold: 0.2, rootMargin: '0px',unobserveOnEnter: true}}
        on:inview_change={(e) => sectionCollections = e.detail.inView}
    >
        {#if sectionCollections}
			<h2 
			class="p-4 text-2xl text-center lg:text-3xl bg-[#fae0df]"
			in:fly={{duration: 600, y: -30, delay: 400, easing: quartOut}}
		>
			Collections
			</h2>

			<div 
				class="py-4 space-y-2 grid justify-items-center grid-cols-2 lg:flex justify-center lg:gap-4"
				
			>
				
            <div class="" in:fly={{duration: 1600, y: 50, delay: 600, easing: quartOut}}>
                <Collection link="shop/collections/earth" url="/images/collections/home_cups.png" caption="Cups" />
            </div>

            <div class="" in:fly={{duration: 1600, y: 50, delay: 1000, easing: quartOut}}>
                <Collection link="shop/collections/calm" url = "/images/collections/silicone.jpeg" caption="Molds"/>
            </div>

            <div class="" in:fly={{duration: 1600, y: 50, delay: 1400, easing: quartOut}}>
                <Collection link="shop/collections/gift" url = "/images/collections/ceramic.png" caption="Ceramic"/>
            </div>					
				
			</div>
        {/if}
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