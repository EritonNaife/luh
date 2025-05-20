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
            <img src="/images/earth.jpeg" alt="Calm Collection" class="w-full h-full object-cover">
            <h1 class="absolute top-130 text-3xl text-white lg:text-5xl" in:fly={{duration:2000, y:100}} >Earth Candle Collection</h1>
        </div>

        <div class="flex flex-col justify-center items-center">
            <h2 class="text-xl lg:text-2xl">Bring the Forest Home</h2>
            <p class="text-center lg:text-xl">Ground yourself in nature’s finest: warm cedarwood, fresh eucalyptus, and rich vetiver to reconnect mind and space</p>
        </div>

    </section>
    
    <section class="p-4 product-display space-y-10 mx-auto lg:w-7xl">

        <div class="flex justify-between">

            <div class="flex gap-4 items-center">
                <Icon icon="pepicons-print:sliders" width="20" height="20" />
                <button on:click={toggleFilterMenu} aria-label="Filter menu">Filter</button>
            </div>

            <div class="flex gap-5 items-center curser-pointer select-none" on:click={toggleSort}>
                <span>Sort by</span>
                {#if isAscending}
                 <Icon icon="formkit:up" width="16" height="7" />
                {:else}
                <Icon icon="formkit:down" width="16" height="7" />
                {/if}
            </div>

        </div>

        <div class="products grid grid-cols-2 lg:grid-cols-4">
            {#each featuredProducts as product}
			<div class="flex flex-col w-56 lg:w-75">
			  <img
				src={product.imageUrl}
				alt={product.name}
				class="w-full object-cover border-1 h-50 lg:h-75"/>
			  <div class="py-4">
				<h3 class="text-[17px] lg:text-xl">{product.name}</h3>
				<p class="text-sm">{product.description}</p> 
				<p class="text-[12px]">{(product.price)}</p> 
			  </div>
			</div>
		  {/each}
        </div>

    </section>

</main>