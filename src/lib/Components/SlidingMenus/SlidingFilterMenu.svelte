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


<div 
    class="fixed p-6 top-0 left-0 z-50 w-full h-full bg-white max-w-md shadow-lg flex flex-col"
    transition:slide = {{duration: 500, axis: 'x', easing: quartInOut}}
>

    <div class="header mb-10">
        <div class="flex justify-between text-xl">
            <h2 class="">Filter By</h2>
            <button on:click = {closeMenu}><Icon icon="ei:close" class="size-6" /></button>
        </div>
    </div>

    <div class="main flex-grow overflow-y-none">

        <div class="space-y-6">
            <h2 class="text-lg">Filters</h2>
            <h2 class="text-lg">Price</h2>
            <div class="border-t-1">
                
            </div>

            <div class="flex justify-center items-center mb-15">
                <span>Price:</span>
            </div>

            <div class="flex flex-col gap-5 mb-10">
                <label for="" class="text-md font-bold">Product Group</label>
                <div class="">
                    Dropdown
                </div>
            </div>
            
            <div class="flex flex-col gap-5 mb-10">
                <label for="" class="text-md font-bold">Collections</label>
                <div class="">
                    Dropdown
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <label for="" class="text-md font-bold">Categories</label>
                <div class="">
                    Dropdown
                </div>
            </div>
        </div>

    </div>

    <div class="footer flex flex-col gap-2 items-center">
        <button class="text-white bg-black w-[75%] p-3">Reset</button>
        <button class="text-white bg-black w-[75%] p-3">Apply Filters</button>
    </div>
</div>
