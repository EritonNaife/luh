<script lang="ts">
    import Collection from "$lib/Components/Cards/Collection.svelte"
    import ProductSlider from "$lib/Components/Slider/ProductSlider.svelte";
    import { inview } from 'svelte-inview';
    import { fade, fly} from "svelte/transition";
    import { cubicIn, quartOut } from "svelte/easing";
    import type { Product } from '$lib/data/products';
    export let data: { featuredCups: Product[] };



    let isInView: boolean = false;
	let sectionCollections: boolean = false;


	const handleInViewChange = (event: CustomEvent) => {
        const { inView } = event.detail;
        isInView = inView;
    };
 
</script>

<main class="text-[#6B6B6B]">
    

    <section id="Hero-section" in:fade={{duration: 2000, delay: 50 ,easing: quartOut}}>
        
        <div class="relative bg-cover bg-center h-screen flex flex-col items-center justify-end text-center" style="background-image: url('images/Gemini_Generated_Image_ue7vpkue7vpkue7v.jpeg')">

            <div class="absolute inset-0 bg-black/40 "></div>

            <div class="absolute bottom-30 text-white mb-5 md:right-30 md:top-90" in:fly={{duration:800, x: 30 ,easing:cubicIn}}>

                <h1 class="text-4xl md:text-5xl lg:text-6xl mb-4">Your Awesome Headline</h1>
                <p class="text-md md:text-xl lg:text-2xl max-w-2xl">A compelling description or call to action.</p>
                <button class="mt-8 min-h-10 px-4 text-base text-[#333333] shadow-sm rounded-md bg-white hover:bg-black hover:text-white transition md:min-h-xs lg:px-6 ">Learn More</button>

            </div>

        </div>

    </section>
   
    <section id="Latest-products" class="p-4" use:inview={{threshold: 0.3, rootMargin: '0px', unobserveOnEnter: true}} on:inview_change={handleInViewChange} >

        {#if isInView}

            <div class="flex justify-center gap-4 p-4" in:fly={{duration: 1800, y: 50, delay: 400, easing: quartOut}}>
                <h2 class="text-2xl lg:text-3xl">You might like</h2>
            </div>
        {/if}
        
        <ProductSlider/>
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
			in:fly={{duration: 3000, y: -30, delay: 1800, easing: quartOut}}
		>
			Collections
			</h2>

			<div 
				class="py-4 space-y-2 grid justify-items-center grid-cols-2 lg:flex justify-center lg:gap-4"
				
			>
				
            <div class="" in:fly={{duration: 3000, y: 50, delay: 2000, easing: quartOut}}>
                <Collection link="shop/cups/home" url="/images/collections/home_cups.png" caption="Cups" />
            </div>

            <div class="" in:fly={{duration: 3000, y: 50, delay: 2400, easing: quartOut}}>
                <Collection link="shop/molds/silicone" url = "/images/collections/silicone.jpeg" caption="Molds"/>
            </div>

            <div class="" in:fly={{duration: 3000, y: 50, delay: 2800, easing: quartOut}}>
                <Collection link="shop/ceramics" url = "/images/collections/ceramic.png" caption="Ceramic"/>
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