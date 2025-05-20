

<script lang="ts">
    import Icon from '@iconify/svelte';
    import { featuredProducts } from '$lib/data/products';
    import ProductCard from '$lib/Components/Cards/ProductCard.svelte';
	import { fly, scale, slide } from 'svelte/transition';
	import { cubicIn, cubicOut, quadInOut, quadOut, quartIn } from 'svelte/easing';

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

        <div class="h-screen flex justify-center items-center" in:scale={{duration: 1000, start: 1.3 , opacity: 0 , easing: cubicOut}} >
            <img src="/images/discountHero.jpeg" alt="Calm Collection" class=" w-full h-full object-cover">
            <div class="absolute top-[25%] flex flex-col items-center text-white gap-5 lg:left-60 lg:top-70" in:fly={{duration:2000, x: -200}} >
                <h1 class="text-3xl lg:text-5xl">Up to</h1>
                <h1 class="text-4xl lg:text-6xl">60% OFF</h1>
                <h1 class="text-4xl lg:text-6xl">Candles</h1>
                <p class="text-md text-center lg:text-md">Selected Scents Today only<br>.one click away</p>
                <button class="py-1 px-3 bg-white text-black hover:bg-black hover:text-white font-semibold rounded-md">Shop Now</button>
            </div>
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