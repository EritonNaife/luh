<script lang="ts">
    import type { PageData } from '../$types.js';
    import Icon from '@iconify/svelte';
    import SlidingFilterMenu from '$lib/Components/SlidingMenus/SlidingFilterMenu.svelte';
    import ProductCard from '$lib/Components/Cards/ProductCard.svelte';
  
    export let data: PageData;
    const products = data.products;
    
    let isAscending = false;
    let filterMenu:boolean = false;
</script>


<main class="p-4">
 
    <section class="max-w-7xl space-y-20 mx-auto">
        <div class="flex justify-between mt-[25%] lg:mt-[15%]">

            <div class="flex gap-4 items-center">
                <Icon icon="pepicons-print:sliders" width="20" height="20" />
                <button on:click={()=> (filterMenu =true )} aria-label="Filter menu">Filter</button>
            </div>

        </div>

        <div class="products space-y-10 grid grid-cols-2 lg:grid-cols-4">
            {#each products as product}
                <ProductCard {product}/>
            {/each}
        </div>
    </section>
   
</main>

{#if filterMenu}
<SlidingFilterMenu isMenuOpen = {filterMenu} closeMenu = {() => {filterMenu = false}}/>
{/if}


<style>

</style>