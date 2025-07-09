<script lang="ts">
	import Icon from "@iconify/svelte";


</script>





<main class="">

    <section id="hero-section " >

        <div class="image-container min-h-[40vh] flex justify-center items-end"  >
            <img src="/images/collections/cups_hero_section.png" alt="" class="w-full h-full object-cover object-center" >
            <h1 class="absolute">Home</h1>
        </div>

        <div class="content-container flex flex-col justify-center items-center gap-2">
            <h2></h2>
            <p class="text-center"> </p>
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
               
            </div>
            
            <div id="product-grid" class="mt-10 p-2 grid grid-cols-2 justify-items-center space-y-4 md:grid-cols-3 lg:grid-cols-4">

                <!--
                    {#each featuredProducts as product}
    
                    <div class="card flex flex-col gap-2 group cursor-pointer">
    
                        <div
                           class="w-[45vw] h-[30vh] sm:w-[46vw] sm:h-100 md:w-[31vw] md:h-[30vh] 
                                  lg:w-[24vw] lg:h-[40vh] p-2 relative bg-cover bg-center flex justify-end items-end" 
                           style="background-image: url('/images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png');">
    
                            <div class="bg-white transition-transform duration-300 group-hover:-translate-y-2 "on:click ={toggleSizeOptions}>
                                <Icon icon = "mynaui:plus" class="size-7 transition-transform duration-200 hover:rotate-90" />
                            </div>
                        </div>
    
                        <footer>
                            <h3>{product.name}</h3>
                            <p>€ {product.price}</p>
                        </footer>
                    </div>
                {/each}
                -->
               
            </div>
    
    </section>

</main>