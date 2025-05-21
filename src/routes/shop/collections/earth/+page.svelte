<script lang="ts">
    import Icon from '@iconify/svelte';
    import { featuredProducts } from '$lib/data/products';
    import ProductCard from '$lib/Components/Cards/ProductCard.svelte';
	import { fly, scale } from 'svelte/transition';

    let isAscending = false;
    let filterMenu = false;
    function  toggleFilterMenu()  {
        filterMenu = !filterMenu;
    }
    function toggleSort() {
  isAscending = !isAscending;
  // You can add your sorting logic here based on the 'isAscending' value
  console.log('Sort direction:', isAscending ? 'Ascending' : 'Descending');
}
</script>



<main class="relative space-y-20">

    <section class="hero-section space-y-5">

        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }} >
            <img src="/images/earth.jpeg" alt="http://localhost:5173/images/earth.jpegCalm Collection" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Earth Candle Collection</h1>
        </div>

        <div class="flex flex-col justify-center items-center">
            <h2 class="text-2xl/8 font-light  lg:text-2xl">Bring the Forest Home</h2>
            <p class="text-center text-md/8 lg:text-xl">Ground yourself in nature’s finest: warm cedarwood, fresh eucalyptus, and rich vetiver to reconnect mind and space</p>
        </div>

    </section>
    
    <section class="p-4 product-display space-y-10 mx-auto lg:w-7xl">

       

    </section>

</main>