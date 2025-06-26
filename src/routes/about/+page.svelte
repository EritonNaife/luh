<script lang="ts">
	import { fade, fly, scale, slide } from 'svelte/transition';
    import IntersectionObserver from "svelte-intersection-observer";
    import type { TransitionConfig } from 'svelte/transition';
	import { quintOut, backOut, elasticOut } from 'svelte/easing';

    // Custom transition for staggered card animations
    function staggeredFade(node: Element, { delay = 0, duration = 400, index = 0 }): TransitionConfig {
        return {
            delay: delay + (index * 150),
            duration,
            easing: quintOut,
            css: t => `
                opacity: ${t};
                transform: translateY(${(1 - t) * 30}px);
            `
        };
    }

    // Custom transition for text reveal
    function textReveal(node: Element, { delay = 0, duration = 800 }): TransitionConfig {
        return {
            delay,
            duration,
            easing: quintOut,
            css: t => `
                opacity: ${t};
                transform: translateY(${(1 - t) * 50}px);
                clip-path: inset(${(1 - t) * 100}% 0 0 0);
            `
        };
    }

    function scaleFly(
    node: Element, 
    { 
        delay = 0, 
        duration = 600, 
        easing = backOut, 
        start = 0.5, 
        y = -30 
    }: {
        delay?: number;
        duration?: number;
        easing?: (t: number) => number;
        start?: number;
        y?: number;
    } = {}
): TransitionConfig {
    return {
        delay,
        duration,
        easing,
        css: (t: number) => {
            const scale = start + (1 - start) * t;
            const translateY = (1 - t) * y;
            
            return `
                transform: scale(${scale}) translateY(${translateY}px);
                opacity: ${t};
            `;
        }
    };
}

  
	let node: HTMLElement;
    let node1: HTMLElement;
    let node2: HTMLElement;
    let node3: HTMLElement; // For final CTA section
    let intersecting: boolean;
</script>

<main class="w-full mt-[25%] lg:mt-[5%]">

    <!-- HERO SECTION - Enhanced with more dynamic animations -->
    <header class="bg-white overflow-hidden">
        <div class="container mx-auto px-6 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">

            <div class="text-center md:text-left">
                <!-- Animated headline with text reveal effect -->
                <h1 class="text-5xl font-light leading-tight tracking-tight mb-4" 
                    in:textReveal={{delay: 300, duration: 1000}}>
                    Care is a flame that never fades.
                </h1>

                <!-- Subtitle with delayed slide up -->
                <p class="text-lg font-light leading-relaxed" 
                   in:slide={{axis: 'y', delay: 800, duration: 600, easing: quintOut}}>
                    At Luh Bea, we believe that care is more than a gesture — it's a presence, an intention, a flame that stays lit even on the calmest days.
                </p>
            </div>

            <!-- Image with scale and bounce effect -->
            <div class="aspect-[4/3]" 
                 in:scale={{delay: 400, duration: 1200, easing: backOut, start: 0.8}}>
                <img src="images/ChatGPT Image Jun 20, 2025, 03_44_32 PM.png" 
                     alt="A beautifully crafted Luh Bea candle" 
                     class="w-full h-full object-cover rounded-lg shadow-xl">
            </div>
        </div>
    </header>

    <!-- SECTION 1 - Enhanced with better timing -->
    <section id="section1" class="container mx-auto px-6 py-16 lg:py-24 text-center max-w-4xl">
        <IntersectionObserver element={node} let:intersecting>
            <div bind:this={node}>
               {#if intersecting}
                <div in:fade={{delay: 200, duration: 600}}>
                    <!-- Title slides up with elastic easing -->
                    <h2 class="text-4xl font-light leading-snug tracking-tight mb-4" 
                        in:slide={{axis: "y", delay: 400, duration: 800, easing: elasticOut}}>
                        Turning Moments into Memories
                    </h2>
                    
                    <!-- Paragraph with staggered reveal -->
                    <p class="font-light leading-relaxed" 
                       in:textReveal={{delay: 700, duration: 800}}>
                        We are a brand of decorative and aromatic candles created with one purpose: to turn everyday moments into sensory experiences full of meaning. Every candle we craft is thoughtfully designed — made to delight the eyes, warm the space, and touch the heart.
                    </p>  
                </div>
               {/if}
            </div>
        </IntersectionObserver>
    </section>

    <!-- SECTION 2 - Enhanced with icon animation -->
    <section class="section bg-stone-100">
        <IntersectionObserver element={node1} let:intersecting>
            <div class="container mx-auto px-6 py-12 text-center flex flex-col items-center gap-4 md:flex-row md:justify-center" bind:this={node1}>
                {#if intersecting}
                    <!-- Star icon with scale and rotation -->
                    <div class="flex-shrink-0" in:scaleFly={{delay: 300, duration: 600, easing: backOut, start: 0.5, y: -30}}>
                        <svg class="w-10 h-10 text-amber-700 animate-pulse" 
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                             stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.584a.563.563 0 01.321.988l-4.204 3.055a.563.563 0 00-.182.557l1.528 4.707a.562.562 0 01-.812.622l-4.204-3.055a.563.563 0 00-.58 0l-4.204 3.055a.562.562 0 01-.812-.622l1.528-4.707a.563.563 0 00-.182-.557l-4.204-3.055a.563.563 0 01.321-.988h5.584a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </div>
        
                    <!-- Text with typewriter-like reveal -->
                    <h3 class="text-2xl font-normal leading-normal max-w-3xl" 
                        in:textReveal={{delay: 1000, duration: 1000}}>
                        Crafted with 100% organic waxes, each candle offers a clean, toxin-free burn for moments of comfort and peace.
                    </h3>
                {/if}
            </div>
        </IntersectionObserver>
    </section>

    <!-- SECTION 3 - Enhanced with staggered card animations -->
    <section class="bg-white">
        <IntersectionObserver element={node2} let:intersecting>
            <div class="container mx-auto px-6 py-16 lg:py-24" bind:this={node2}>
               {#if intersecting}
                    <!-- Section header -->
                    <div class="text-center max-w-3xl mx-auto mb-12" 
                         in:slide={{axis: 'y', delay: 200, duration: 800, easing: quintOut}}>
                        <h2 class="text-4xl font-light leading-snug tracking-tight">Our Commitment to You</h2>
                        <p class="mt-4 font-light leading-relaxed" 
                           in:fade={{delay: 500, duration: 600}}>
                            Our commitment is to be different — not just in what we offer, but in how we connect with you. From the packaging to the fragrances, everything is done with attention, authenticity, and affection.
                        </p>
                    </div>

                    <!-- Cards with staggered animations -->
                    <div class="grid md:grid-cols-3 gap-8 text-center">

                        <!-- Card 1 - Thoughtfully Designed -->
                        <div class="p-8 border border-stone-200 rounded-lg hover:shadow-lg transition-shadow duration-300" 
                             in:staggeredFade={{delay: 600, index: 0}}>
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4"
                                 in:scale={{delay: 800, duration: 400, easing: backOut}}>
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal mb-2">Thoughtfully Designed</h3>
                            <p class="font-light leading-relaxed">Made to delight the eyes, warm the space, and touch the heart.</p>
                        </div>

                        <!-- Card 2 - Authenticity & Affection -->
                        <div class="p-8 border border-stone-200 rounded-lg hover:shadow-lg transition-shadow duration-300" 
                             in:staggeredFade={{delay: 600, index: 1}}>
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4"
                                 in:scale={{delay: 950, duration: 400, easing: backOut}}>
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal mb-2">Authenticity & Affection</h3>
                            <p class="font-light leading-relaxed">From packaging to fragrance, every detail is chosen with genuine care.</p>
                        </div>

                        <!-- Card 3 - Sensory Experiences -->
                        <div class="p-8 border border-stone-200 rounded-lg hover:shadow-lg transition-shadow duration-300" 
                             in:staggeredFade={{delay: 600, index: 2}}>
                            <div class="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4"
                                 in:scale={{delay: 1100, duration: 400, easing: backOut}}>
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M15.536 8.464a5 5 0 010 7.072m-2.122-2.122a2 2 0 010 2.828m-2.121-2.121a2 2 0 00-2.828 0M4.929 4.929a10 10 0 0014.142 0"></path>
                                </svg>
                            </div>
                            <h3 class="text-2xl font-normal leading-normal mb-2">Sensory Experiences</h3>
                            <p class="font-light leading-relaxed">Transforming your space with scents that evoke emotion and meaning.</p>
                        </div>
                    </div>
               {/if}
            </div>
        </IntersectionObserver>
    </section>
    
    <!-- FINAL CTA SECTION - Enhanced with dramatic entrance -->
    <section class="container mx-auto px-6 py-16 lg:py-24">
        <IntersectionObserver element={node3} let:intersecting>
            <div class="text-center max-w-3xl mx-auto" bind:this={node3}>
                {#if intersecting}
                    <!-- Image with zoom effect -->
                    <div in:scale={{delay: 200, duration: 1000, easing: quintOut, start: 1.1}}>
                        <img src="https://images.unsplash.com/photo-1596205219446-522514930b80?q=80&w=1964&auto=format&fit=crop" 
                             alt="Person enjoying a Luh Bea candle" 
                             class="w-full h-80 object-cover rounded-lg shadow-lg mb-8">
                    </div>
                    
                    <!-- Title with dramatic slide up -->
                    <h2 class="text-4xl font-light leading-snug tracking-tight mb-4" 
                        in:slide={{axis: 'y', delay: 600, duration: 800, easing: quintOut}}>
                        You Are Part of Our Story
                    </h2>
                    
                    <!-- Paragraph with fade in -->
                    <p class="text-lg font-light leading-relaxed mb-8" 
                       in:fade={{delay: 900, duration: 600}}>
                        Each candle is a reminder that care begins within — and spreads gently, like a flame, to every place it reaches. Thank you for letting us be part of your space.
                    </p>
                    
                    <!-- CTA button with bounce effect -->
                    <div in:scale={{delay: 1200, duration: 600, easing: backOut, start: 0.8}}>
                        <a href="#" class="text-sm font-body font-semibold uppercase tracking-wider inline-block bg-stone-800 text-white py-3 px-8 rounded-lg hover:bg-stone-900 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                            Explore Our Collection
                        </a>
                    </div>
                {/if}
            </div>
        </IntersectionObserver>
    </section>

</main>