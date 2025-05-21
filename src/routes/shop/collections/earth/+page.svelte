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



<main class="">

    <section class="hero-section" in:scale={{duration: 1000, start: 1.5 , opacity: 0 }}>

        <div class="h-[70vh] flex justify-center items-end sm:h-[80vh] md:h-[70vh] lg:h-[80vh]"  >
            <img src="/images/earth.jpeg" alt="http://localhost:5173/images/earth.jpegCalm Collection" class="w-full h-full object-cover">
            <h1 class="absolute text-3xl text-white lg:text-5xl mb-20" in:fly={{duration:2000, y:100}} >Earth Candle Collection</h1>
        </div>

        <div class="p-4 flex flex-col justify-center items-center gap-2" in:fly={{duration:2000, y:100}} >
            <h2 class="text-2xl/8 font-light lg:text-2xl"> Bring the Forest Home</h2>
            <p class="text-center text-md/8 font-light lg:text-xl"> Ground yourself in nature’s finest: warm cedarwood, fresh eucalyptus, and rich vetiver to reconnect mind and space</p>
        </div>

    </section>
    
    
    <section id="product-display" class="mt-10">
        
        <div class="p-2 flex justify-around w-full">

            <div class="">
                <button class="">Filter</button>
            </div>

            <div class=""></div>

            <div class="">
                <button class="flex items-center">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
            </div>
         
        </div>
        
        <div id="product-grid" class="p-2 grid grid-cols-2">
            {#each featuredProducts as product}
                <ProductCard {product} />
            {/each}
        </div>

    </section>



   
</main>