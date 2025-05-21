<script lang="ts">
    import Icon from '@iconify/svelte';
    import { featuredProducts } from '$lib/data/products';
    import ProductCard from '$lib/Components/Cards/ProductCard.svelte';
    import { fly, scale } from 'svelte/transition';

    let isAscending = false;
    let filterMenu = false;
    let iVisible =false;

    function toggleVisible() {
        iVisible = !iVisible;
    }

    function  toggleFilterMenu()  {
        filterMenu = !filterMenu;
    }
    function toggleSort() {
  isAscending = !isAscending;
  // You can add your sorting logic here based on the 'isAscending' value
  console.log('Sort direction:', isAscending ? 'Ascending' : 'Descending');
}
</script>



<main>

    <section class="hero-section">

        <div class="h-[70vh] flex justify-center items-center" 
             in:scale={{duration: 1000, start: 1.5 , opacity: 0 }} >
             
            <img src="/images/mood.jpeg" alt="Calm Collection" class="w-full h-full object-cover">
            <h1 class="absolute top-130 text-3xl text-white lg:text-5xl" in:fly={{duration:2000, y:100}} >Mood Candle Collection</h1>
        </div>
        
        <!--
        <div class="p-5 flex flex-col justify-center items-center">
            <p class="text-center text-2xl/8 font-light lg:text-xl">
                Light to shift the atmosphere. The Mood Collection harnesses scent as emotion—bold amber, smoky vetiver, and wild fig stir something deep. From warm, grounding blends to bright, playful accords, each candle invites transformation. Whether you seek focus, romance, or energy, this is your ritual—an olfactive switch to tune the day, the room, and yourself.
            </p>
        </div>
        -->

      
        <div class="flex flex-col justify-center items-center">
            <h2 class="text-2xl/8 font-light lg:text-2xl">Shift the Energy</h2>
            <p class="text-center text-md/8 font-light lg:text-xl">From smoky vetiver to sultry amber, set the tone with scents that inspire focus, creativity, and emotion</p>
        </div>
        


    </section>
    
    <section id="product-display"  class="h-screen">

    </section>
</main>