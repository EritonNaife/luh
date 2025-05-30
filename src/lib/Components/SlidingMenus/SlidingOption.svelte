<script lang="ts">
	import Icon from "@iconify/svelte";
	import { cubicInOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    let sizes = ['S', 'M' , "L"];
</script>



<div class="fixed py-4 bottom-0 w-full h-[25vh] bg-white shadow-2xl flex flex-col justify-center items-center gap-6" 
     transition:slide = {{duration:300, axis: 'y' ,easing: cubicInOut}}>

    <h2 class="text-xl">Choose an Option</h2>
    
    <div class="sizes flex justify-center gap-5">
        {#each sizes as s }
            <div class="size-10 rounded-full p-4 border-2 text-xs flex justify-center items-center">{s}</div>
        {/each}
    </div>
    
    <a href="" class="mx-auto w-[90vw] py-2 border-1 text-center hover:text-white hover:bg-black">Add to Cart</a>

</div>






