<script lang="ts">
	import Icon from "@iconify/svelte";

    let sizes = ['S', 'M' , "L"];
</script>



<div class="absolute py-4 bottom-0 w-full h-[80vh] bg-white flex flex-col gap-6">

    <h2 class="text-center text-2xl">Choose options</h2>

    <div class="w-full h-1 border-t-2"></div>

    <div class="p-4 flex items-center justify-between">

        <Icon icon="ep:arrow-left" class="size-6" />
        
        <div class="flex flex-col gap-2">

            <div class="bg-black size-56"></div>
            <div class="flex flex-col text-center">
                <h3 class="text-xl">Candle</h3>
                <p class="text-sm">Price</p>
            </div>

        </div>

        <Icon icon="ep:arrow-right" class="size-6" />
    </div>

    <div class="w-full h-1 border-t-2"></div>

    <div class="sizes flex justify-center gap-5">
        {#each sizes as s }
            <div class="size-10 rounded-full p-4 border-2 text-xs flex justify-center items-center">{s}</div>
        {/each}
    </div>
    
    <a href="" class="mx-auto w-[95vw] py-2 border-1 text-center hover:text-white hover:bg-black">Add to Cart</a>

</div>






