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
        
        <div class="flex justify-between w-full border-t-[1px] border-b-[1px]">

            <div class="p-2 w-[30%] flex justify-center">
                <button class="">Filter</button>
            </div>

         

            <div class="p-2 w-[30%] border-l-[0.5px] flex justify-center">
                <button class="flex items-center">Sort By  <Icon icon="lsicon:down-filled" width="16" height="16" /></button>
            </div>

            

            <div class="p-2 images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngimages/ChatGPT Image Apr 27, 2025, 02_33_59 PM.pngw-[20%] border-l-[0.5px] flex justify-center items-center gap-1">
                <Icon icon="material-symbols-light:square" class="size-7 text-black/70"/>
                <Icon icon="clarity:grid-view-solid" class="size-6 text-black/70" />
            </div>
        </div>
        
        <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">
            {#each featuredProducts as product}

                <div class="card flex flex-col gap-2 group cursor-pointer">

                    <a href="/products/{product.id}" 
                       class="w-[45vw] h-[30vh] sm:w-8 sm:h-100 md:w-[31vw] md:h-[30vh] 
                              lg:w-[24vw] lg:h-[40vh] p-2 relative bg-cover bg-center flex justify-end items-end" 
                       style="background-image: url('/images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png');">

                        <div class="bg-white transition-transform duration-300 group-hover:-translate-y-2 ">
                            <Icon icon = "mynaui:plus" class="size-7 transition-transform duration-200 hover:rotate-90"/>
                        </div>
                    </a>

                    <footer>
                        <h3>{product.name}</h3>
                        <p>€ {product.price}</p>
                    </footer>
                </div>
            {/each}
        </div>

    </section>

</main>