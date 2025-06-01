<script lang="ts">
	import Icon from "@iconify/svelte";
	import { cubicInOut } from "svelte/easing";
    import { scale, slide } from "svelte/transition";

    export let closeMenu: () => void = () => {};
    let sizes = ['S', 'M' , "L"];
</script>



<div class="fixed w-full h-full block lg:hidden" on:click={closeMenu}></div>

<div class="fixed py-4 bottom-0 w-full h-[24vh] bg-white shadow-[0px_6px_15px_5px_rgba(51,51,51,0.8)] flex flex-col justify-center gap-6 lg:hidden" 
     transition:slide = {{duration:300, axis: 'y' ,easing: cubicInOut}}>

    <div class="w-full flex justify-between">
        <h2 class="text-xl text-center ml-[40%]">Pick a size:</h2>
        <button class="" on:click={closeMenu}><Icon icon="ei:close" class=" size-6 mr-1" /></button>
    </div>
    
    
    <div class="sizes flex justify-center gap-5">
        {#each sizes as s }
            <div class="size-10 rounded-full p-4 border-2 text-xs flex justify-center items-center">{s}</div>
        {/each}
    </div>
    
    <a href="" class="mx-auto w-[90vw] py-2 border-1 text-center hover:text-white hover:bg-black">Add to Cart</a>

</div>


<div class="hidden fixed h-screen w-screen lg:flex justify-center items-center inset-0 bg-black/50 " on:click={closeMenu}></div>

<div class="fixed hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:flex flex-col p-4 bg-white w-full max-w-xl h-[60vh] space-y-10"
            transition:scale={{duration: 600}}>

    <div class="flex justify-end">
        <button on:click = {closeMenu}><Icon icon="ei:close" class="size-6" /></button>
    </div>
    
    <div class="flex space-x-10 space-y-5">

        <div class="w-60 h-70 bg-black">
            <img src="images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png" alt="" class="w-full h-full object-cover rounded-lg">
        </div>

        <div class=" h-70 flex flex-col">

            <h3>Lavander Dream Candle</h3>
            <p class="text-xs mb-10">Price</p>

            <div class="flex flex-col justify-center items-center gap-3 mb-5">
                <h4>Select Size:</h4>
                <div class="flex justify-center gap-4">
                    <button class="size-button border rounded-md px-4 py-2">
                        S <span class="block text-xs ">(€18)</span>
                    </button>

                    <button class="size-button border rounded-md px-4 py-2">
                        S <span class="block text-xs ">(€18)</span>
                    </button>

                    <button class="size-button border rounded-md px-4 py-2">
                        S <span class="block text-xs ">(€18)</span>
                    </button>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <h3>Quantity</h3>
                <div class="flex items-center space-x-3">
                    <button id="decreaseQuantity" aria-label="Decrease quantity" class="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <span id="quantity" class="text-lg font-medium text-gray-800 w-8 text-center">1</span>
                    <button id="increaseQuantity" aria-label="Increase quantity" class="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            
        </div>
    </div>

    <button class="py-2 border-1 hover:bg-black hover:text-white ">Add to Cart</button>
</div>


