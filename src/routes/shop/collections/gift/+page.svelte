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

        <div class="h-170 flex justify-center items-center" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }} >
            <img src="/images/gift.jpeg" alt="Calm Collection" class="w-full h-full object-cover">
            <h1 class="absolute top-130 text-3xl text-white lg:text-5xl" in:fly={{duration:2000, y:100}} >Gift Candle Collection</h1>
        </div>

        <div class="p-5 flex flex-col justify-center items-center">
            <p class="text-center text-2xl/8 font-light lg:text-xl">
                Wrapped in intention, the Gift Collection turns scent into sentiment. Delicate florals, warm resins, and bright botanicals are presented in timeless vessels—ready to be treasured. Whether marking a milestone or offering everyday elegance, these candles elevate the art of giving. Thoughtful, refined, and universally loved, they speak without words and linger with grace.</p>
        </div>

    </section>
    
    <section class="p-4 product-display space-y-10 mx-auto lg:w-7xl">

      

    </section>

</main>