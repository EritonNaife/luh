<script lang="ts">
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";
    import { cubicInOut, quartInOut, quintOut } from "svelte/easing";
    export let isMenuOpen = false;
    export let closeMenu: () => void = () => {};
</script>

<div 
  class="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
  class:opacity-0={!isMenuOpen}
  class:opacity-100={isMenuOpen}
  class:invisible={!isMenuOpen}
  class:visible={isMenuOpen}
  on:click={closeMenu}
></div>



<div class="fixed inset-y-0 top-0 right-0 w-full max-w-xs h-full shadow-lg bg-white z-50 flex flex-col"
transition:slide = {{duration: 300, axis: 'x', easing: quartInOut}}
>

    <div class="header p-5 flex justify-between items-center text-2xl">
        <h1 class="">Cart</h1>
        <button on:click = {closeMenu}><Icon icon="ei:close" class="size-6" /></button>
        
    </div>

    <div class="h-1 border-t-1 mt-10"></div>

    <div class="p-5 content flex flex-col gap-5">

        <div class="main-content grid grid-cols-2 items-center">

            <img src="" alt="Image" class="w-30 h-30">

            <div class="info space-y-4">
                <h3>Candle name</h3>
                <p>Price</p>
                <div class="flex items-center gap-5">
                    <button class="w-20 flex justify-around items-center border-1"><span>-</span>1<span>+</span></button> <a href="#">Remove</a>
                </div>
            </div>
        </div>

        <div class="h-1 border-t-1 mt-10"></div>

        <div class="recomended space-y-5">

            <h2 class="text-xl">Recomended</h2>
            
            <div class="main-content grid grid-cols-2 items-center">

                <img src="" alt="Image" class="w-30 h-30">
                
    
                <div class="info space-y-4">
                    <h3>Candle name</h3>
                    <p>Price</p>
                    <a href="" class="">Add to cart</a>
                </div>

            </div>
        </div>

    </div>


    
    <div class="footer p-5 flex flex-col gap-6 mt-20">

        <p>Taxes and shipping calculated at checkout</p>
        <button class="text-white bg-black h-12">View Cart</button>
        <button class="text-white bg-black h-12">Checkout </button>
    </div>
</div>


