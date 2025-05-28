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


    <section class="hero-section" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }}>

        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]" >
            <img src="/images/calm.jpeg" alt="Calm Collection" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Calm Candle Collection</h1>
        </div>

        <!--
        <div class="p-5 flex flex-col justify-center items-center">
            <p class="text-center text-xl/8 font-light lg:text-xl">
                Exhale and soften into stillness. The Calm Collection is a
                gentle whisper of serenity—notes of chamomile, creamy sandalwood, 
                and fresh linen soothe the senses. Drift through fields of white lavender 
                and morning dew, where time slows and quiet reigns. Each candle is a sanctuary,
                crafted to bring peaceful rituals and grounded beauty to your everyday.
            </p>
        </div>
        -->

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}} >
            <h2 class="text-2xl/8 font-light lg:text-2xl">Return to Stillness</h2>
            <p class="text-center text-md/8 font-light lg:text-xl">Soft chamomile, white lavender, and clean woods bring peace to the moment and quiet to the mind</p>
        </div>
        

    </section>

    <section id="product-display"  class="mt-10 ">
        <div class="p-2 flex justify-around w-full border-t-[1px] border-b-[1px]">

            <button class="">Filter</button>
            <button class="flex items-center">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
            
        </div>

    </section>

</main>