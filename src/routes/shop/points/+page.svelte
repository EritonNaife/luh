<script lang="ts">
    import { fade,slide,fly, scale } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
    import ProgressBar from '$lib/Components/ProgressBar/ProgressBar.svelte';
    import ProgressBar2 from '$lib/Components/ProgressBar/ProgressBar2.svelte';
    import Icon from '@iconify/svelte';
    import PointsCarousel from '$lib/Components/Carousel/PointsCarousel.svelte';
    import { pointsCardData,type PointsCard } from '$lib/data/pointsCardData';

    
    let points:number = 1200;
    let max:number  = 5000;


  
</script>

<main class="text-[#2F2F2F]">

    <section class="mt-28 px-3 py-5 bg-[#ecebe7]/70 lg:py-10" in:scale={{duration:1000,start: 1.5, opacity:0}}>

      <div class="grid lg:grid-cols-2 justify-items-center gap-5">

        <div class="order-2 flex flex-col justify-center items-center lg:order-1 ">
            <h1 class="text-4xl md:text-6xl">Our Points Program</h1>
            <p class="my-3 text-sm md:text-lg lg:mb-5">Get Rewarded for shopping your favorite candles</p>
            <button class="bg-black text-white rounded-md hover:bg-black/80 lg:px-6 lg:py-3">Shop Now</button>
        </div>

        <div class="order-1 lg:order-2">
            <img src="/images/points-hero-section.jpeg" alt="image" class="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]">
        </div>
      </div>

    </section>


    <section class="mt-40 max-w-5xl mx-auto">
        <h2 class="text-center px-2 mb-7 text-3xl lg:text-4xl">How to earn points</h2>
        <div class="block md:hidden">
            <PointsCarousel/>
        </div>
       
            <div class="hidden md:grid gap-4 md:grid-cols-3 ">

               {#each pointsCardData as card}
                <div class="p-4 w-75 rounded-lg shadow-xl flex flex-col gap-4">
                    <Icon icon={card.icon} class="w-10 h-10" />
                    <h3  class="text-xl">{card.title}</h3>
                    <p class="text-center">{card.description}</p>
                    <div class="w-full border-t-1"></div>
                    <p class="text-center text-sm">{card.annotation}</p>
                </div>
               {/each}
            </div>

    </section>

    <section class="p-5 mt-30 mx-auto flex justify-center shadow-lg">

        <div class="w-100 h-50 flex flex-col items-center gap-10">

            <div class="h-8">
                <h3 class="text-3xl md:text-4xl">Your Points Balance</h3>
            </div>

            <div class="flex flex-col items-center gap-4 lg:text-2xl">
                <span class="text-2xl md:text-xl">You have {points} Points</span>
                <ProgressBar current = "{points}" max = "{max}"/>
            </div>
        </div>
    </section>

    <section class="max-w-[1200px] my-10 mx-auto text-center space-y-10">
        <h2 class="text-3xl lg:text-4xl">Redeem your points with our candles</h2>
        <p class="text-sm lg:text-xl">Turn your points into delight delightful experiences! Use your accumulated points to redeem your favorite candle products from our exclusive rewards catalog. Browse the selection below and add a touch of warmth and fragrance to your space, on us</p>
        
        <div class="grid gap-4 justify-center lg:grid-cols-3 ">

            <div class="p-3 w-75 flex flex-col">
                <img src="" alt="" class="object-cover w-full h-70 border-1">
                <h3 class="mt-[5px]">Vanilla Bean Dream</h3>
                <div class="flex flex-col gap-2">
                    <h4>800 points</h4>
                    <ProgressBar2 current = "{points}" max= "{800}" />
                </div>
            </div>

            <div class="p-3 w-75 flex flex-col">
                <img src="" alt="" class="object-cover w-full h-70 border-1">
                <h3 class="mt-[5px]">Vanilla Bean Dream</h3>
                <div class="flex flex-col gap-2">
                    <h4>5000 points</h4>
                    <ProgressBar2 current = "{points}" max= "{5000}" />
                </div>
            </div>
            
            <div class="p-3 w-75 flex flex-col">
                <img src="" alt="" class="object-cover w-full h-70 border-1">
                <h3 class="mt-[5px]">Vanilla Bean Dream</h3>
                <div class="flex flex-col gap-2">
                    <h4>3000 points</h4>
                    <ProgressBar2 current = "{points}" max= "{3000}" />
                </div>
            </div>
            
        </div>

    </section>

    <section class="max-w-[960px] mx-auto mt-20">

        <h2 class="text-3xl lg:text-4xl text-center mb-7 ">
         Frequently Asked Questions</h2>

        <div class="p-4 mb-5 shadow-xl">
            <h3 class="text-xl lg:text-2xl">Do my points expire?</h3>
            <p class="p-4 lg:text-lg">No—your points remain valid indefinitely as long as your account is active.</p>
        </div>

        <div class="p-4 mb-5 shadow-xl">
            <h3 class="text-xl lg:text-2xl">Is there a minimum number of points to redeem?</h3>
            <p class="p-4 lg:text-lg">Yes—you need at least 200 points to start redeeming rewards.</p>
        </div>

        <div class="p-4 mb-5 shadow-xl">
            <h3 class="text-xl lg:text-2xl">How long does it take for points to appear?</h3>
            <p class="p-4 lg:text-lg">Points from purchases appear within 24 hours; review and referral points post immediately</p>
        </div>

        <div class="p-4 mb-5 shadow-xl">
            <h3 class="text-xl lg:text-2xl">Can I transfer my points?</h3>
            <p class="p-4 lg:text-lg">Points are non-transferable and tied to your account for security reasons.”</p>
        </div>

       
    </section>
</main>