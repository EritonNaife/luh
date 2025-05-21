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



<main>

    <section class="hero-section" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }} >

        <div class="h-[70vh] flex justify-center items-end"  >
            <img src="/images/gift.jpeg" alt="Calm Collection" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Gift Candle Collection</h1>
        </div>

        <!--

            <div class="p-5 flex flex-col justify-center items-center">
                <p class="text-center text-2xl/8 font-light lg:text-xl">
                    Wrapped in intention, the Gift Collection turns scent into sentiment. Delicate florals, warm resins, and bright botanicals are presented in timeless vessels—ready to be treasured. Whether marking a milestone or offering everyday elegance, these candles elevate the art of giving. Thoughtful, refined, and universally loved, they speak without words and linger with grace.</p>
            </div>
        -->

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}}>
            <h2 class="text-2xl/8 font-light lg:text-2xl">Return to Stillness</h2>
            <p class="text-center text-md/8 font-light lg:text-xl">Soft chamomile, white lavender, and clean woods bring peace to the moment and quiet to the mind</p>
        </div>
        

    </section>
    
    <section id="product-display" class="h-screen">

      

    </section>

</main>