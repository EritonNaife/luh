<script lang="ts">
    import type { PageData } from '../$types.js';
    import { featuredProducts } from '$lib/data/products';
    import { selectedCurrency,formatPrice } from "$lib/stores/currency";
    import Icon from '@iconify/svelte';

  
    export let data: PageData;
    const products = data.products;
    let isSizeOptions = false;
    
    function toggleSizeOptions(){
        isSizeOptions = !isSizeOptions;
    }
</script>


<main class="mt-50">

    <section id="product-display" >
        
        <div class="flex justify-between w-full border-t-[1px] border-b-[1px]">

            <div class="p-2 w-[30%] flex justify-center">
                <button class="">Filter</button>
            </div>

         

            <div class="p-2 w-[30%] border-l-[0.5px] flex justify-center">
                <button class="flex items-center">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
            </div>

        </div>
        
        <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">
            {#each featuredProducts as product}

                <div class="card flex flex-col gap-2 group cursor-pointer">

                    <div
                       class="w-[45vw] h-[30vh] sm:w-[46vw] sm:h-100 md:w-[31vw] md:h-[30vh] 
                              lg:w-[24vw] lg:h-[40vh] p-2 relative bg-cover bg-center flex justify-end items-end" 
                       style="background-image: url('{product.imageUrl}');">

                    
                       
                        <div class="bg-white transition-transform duration-300 group-hover:-translate-y-2 "on:click ={toggleSizeOptions}>
                            <Icon icon = "mynaui:plus" class="size-7 transition-transform duration-200 hover:rotate-90" />
                        </div>
                    </div>

                    <footer>
                        <h3>{product.name}</h3>
                        <p>{formatPrice(product.price,$selectedCurrency)}</p>
                    </footer>
                </div>
            {/each}
        </div>

    </section>
    
</main>

