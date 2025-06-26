<script lang="ts">

	import { fade, fly,scale,slide } from 'svelte/transition';
    import IntersectionObserver from "svelte-intersection-observer";
    import type { TransitionConfig } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

  
	let section1: HTMLElement;
    

    let section2: HTMLElement;



    let section3: HTMLElement;
    let section4: HTMLElement;

   
</script>

<main class="w-full mt-[25%] lg:mt-[5%]">

    <header class="bg-white">
        
        <div class="container mx-auto px-6 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center" >

            <div class="text-center md:text-left">

                <h1 class="text-5xl font-light leading-tight tracking-tight mb-4" in:fade={{delay:300,duration:800,easing:quintOut

                }}>
                    Care is a flame that never fades.
                </h1>

                <p class="text-lg font-light leading-relaxed" in:fade={{delay:400,duration:800, easing:quintOut}} >
                    At Luh Bea, we believe that care is more than a gesture — it’s a presence, an intention, a flame that stays lit even on the calmest days.
                </p>

            </div>

            <div class="aspect-[4/3]" in:fly={{x:100, delay:200,duration:1000}}>
                <img src="images/ChatGPT Image Jun 20, 2025, 03_44_32 PM.png" alt="A beautifully crafted Luh Bea candle" class="w-full h-full object-cover rounded-lg shadow-xl">
            </div>
        </div>

    </header>



    <section id="section1" class="container mx-auto px-6 py-16 lg:py-24 text-center max-w-4xl">

        <IntersectionObserver element = {section1} let:intersecting>

            <div class="" bind:this={section1}>

               {#if intersecting}
                <div in:fade={{delay:100, duration:500}}>

                    <h2 class="text-4xl font-light leading-snug tracking-tight mb-4" in:slide={{axis:"y",delay:200,duration:600}} >Turning Moments into Memories</h2>
                    <p class="font-light leading-relaxed" in:slide={{ axis :"y", delay:300, duration: 600 }}>
                            We are a brand of decorative and aromatic candles created with one purpose: to turn everyday moments into sensory experiences full of meaning. Every candle we craft is thoughtfully designed — made to delight the eyes, warm the space, and touch the heart.
                    </p>  

                </div>
                    
               {/if}

            </div>

        </IntersectionObserver>

    </section>

    <section id="section2" class="section bg-stone-100">

        <IntersectionObserver element = {section2} let:intersecting>
            
            <div class="container mx-auto px-6 py-12 text-center flex flex-col items-center gap-4 md:flex-row md:justify-center" bind:this={section2} >

                {#if intersecting}

                    <div class="flex-shrink-0"  in:scale={{ start: 0.8, duration: 400, delay: 300, easing: quintOut }} >
                        <svg class="w-10 h-10 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.584a.563.563 0 01.321.988l-4.204 3.055a.563.563 0 00-.182.557l1.528 4.707a.562.562 0 01-.812.622l-4.204-3.055a.563.563 0 00-.58 0l-4.204 3.055a.562.562 0 01-.812-.622l1.528-4.707a.563.563 0 00-.182-.557l-4.204-3.055a.563.563 0 01.321-.988h5.584a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </div>
        
                    <h3 class="text-2xl font-normal leading-normal max-w-3xl" in:fade={{delay:800}}>
                        Crafted with 100% organic waxes, each candle offers a clean, toxin-free burn for moments of comfort and peace.
                    </h3>
                {/if}
            </div>
        </IntersectionObserver>
       

    </section>

    <section id="section3" class="bg-white">

        <IntersectionObserver element={section3} let:intersecting>
            <div class="container mx-auto px-6 py-16 lg:py-24" bind:this={section3}>
    
               {#if intersecting}
                    <div class="text-center max-w-3xl mx-auto mb-12">
                        <h2 class="text-4xl font-light leading-snug tracking-tight "
                            in:fly={{  delay: 100, duration: 600, y: 20 }}
                        >Our Commitment to You</h2>
                        <p class="mt-4 font-light leading-relaxed"
                            in:fly={{delay: 250, duration: 600, y: 20 }}
                        >
                            Our commitment is to be different — not just in what we offer, but in how we connect with you. From the packaging to the fragrances, everything is done with attention, authenticity, and affection.
                        </p>
                    </div>
    
                    <div class="grid md:grid-cols-3 gap-8 text-center">
    
                        <div class="p-8 border border-stone-200 rounded-lg"
                            in:fly={{ delay: 400, duration: 700, y: 40 }}
                        >
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal mb-2">Thoughtfully Designed</h3>
                            <p class="font-light leading-relaxed">Made to delight the eyes, warm the space, and touch the heart.</p>
                        </div>
    
                        <div class="p-8 border border-stone-200 rounded-lg"
                            in:fly={{  delay: 550, duration: 700, y: 40 }}
                        >
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal mb-2">Authenticity & Affection</h3>
                            <p class="font-light leading-relaxed">From packaging to fragrance, every detail is chosen with genuine care.</p>
                        </div>
    
                        <div class="p-8 border border-stone-200 rounded-lg"
                            in:fly={{ delay: 700, duration: 700, y: 40 }}
                        >
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.122-2.122a2 2 0 010 2.828m-2.121-2.121a2 2 0 00-2.828 0M4.929 4.929a10 10 0 0114.142 0"></path></svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal  mb-2">Sensory Experiences</h3>
                            <p class="font-light leading-relaxed">Transforming your space with scents that evoke emotion and meaning.</p>
                        </div>
    
                    </div>
               {/if}
    
            </div>
        </IntersectionObserver>
    </section>
    
    <section id="section4" class="bg-amber-50">
        <IntersectionObserver element={section4} let:intersecting>
            <div class="container mx-auto px-6 py-16 lg:py-24 text-center max-w-4xl flex flex-col items-center" bind:this={section4}>
    
                {#if intersecting}
                    <div class="mb-8 overflow-hidden rounded-lg shadow-lg" in:fly={{ delay: 100, duration: 800, y: -50, easing: quintOut }}>
                        <img src="https://via.placeholder.com/600x400/FDBA74/FFFFFF?text=Candle+Image" alt="Warm Candle" class="w-full h-auto object-cover">
                    </div>
    
                    <h2 class="text-4xl font-light leading-snug tracking-tight mb-4" in:fade={{ delay: 700, duration: 600 }}>
                        Ignite Your Sensory Journey
                    </h2>
                    <p class="font-light leading-relaxed mb-8" in:fade={{ delay: 850, duration: 600 }}>
                        Discover the perfect candle to transform your space and elevate your everyday moments. Explore our exquisite collection today.
                    </p>
                    <a href="/shop" class="inline-block bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-amber-800 transition-colors"
                       in:fade={{ delay: 1000, duration: 600 }}>
                        Shop Our Collection
                    </a>
                {/if}
    
            </div>
        </IntersectionObserver>
    </section>

</main>

