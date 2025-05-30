<script lang="ts">
    let sizes = ['S', 'M' , "L"];
</script>



<div class="absolute py-4 bottom-0 w-full h-[70vh] bg-white flex flex-col gap-4">

    <h2 class="text-center text-2xl">Choose options</h2>

    <div class="w-full h-1 border-t-2"></div>

    <div class="p-4 flex items-center justify-between">

        <span class="text-md">arrow</span>
        
        <div class="flex flex-col gap-2">

            <div class="bg-black size-56"></div>
            <div class="flex flex-col text-center">
                <h3 class="text-xl">Candle</h3>
                <p class="text-sm">Price</p>
            </div>

        </div>

        <span class="text-md">arrow</span>
    </div>

    <div class="w-full h-1 border-t-2"></div>

    <div class="sizes flex justify-center gap-4 mb-6">
        {#each sizes as s }
            <div class="rounded-full p-4 border-2 text-xs">{s}</div>
        {/each}
    </div>
    
    <a href="" class="mx-auto w-[95vw] py-2 border-1 text-center hover:text-white hover:bg-black">Add to Cart</a>

</div>






