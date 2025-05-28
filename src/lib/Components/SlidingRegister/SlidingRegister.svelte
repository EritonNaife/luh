<script lang="ts">
    import Icon from '@iconify/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { slide} from 'svelte/transition';
    export let isOpen = false;
    export let close: () => void = () => {};
</script>


<div 
  class="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
  class:opacity-0={!isOpen}
  class:opacity-100={isOpen}
  class:invisible={!isOpen}
  class:visible={isOpen}
  on:click={close}
></div>


<div 
    class="fixed p-6 top-0 right-0 w-full max-w-xs mx-auto h-full shadow-lg bg-white z-50 flex flex-col"
    transition:slide = {{duration: 300, axis: 'x', easing: cubicInOut}}
>

    <div class="w-full mx-auto">

        <div class=" flex justify-between mb-50">

            <span class="text-xl">Sign In</span>

            <div class="">
                <button on:click = {close} class="flex items-center gap-2 text-md">Close<span>X</span></button>
                    
            </div>

        </div>

        <div class="flex flex-col gap-10">

            <div class="border-b-1">
                <input type="text" placeholder="Username" class="border-none borber-b-1 w-full">
            </div>

            <div class="border-b-1">
                <input type="password" placeholder="Password" class="border-none borber-b-1">
            </div>

            <div class="flex items-center gap-2">
                <div class="size-3 border-1"></div>
                <p>Remember me</p>
            </div>
                            
            <button class="py-3 border-1 w-[70%] mx-auto bg-black text-white">Sign In</button>
            <button class="py-3 border-1 w-[70%] mx-auto hover:bg-black hover:text-white">Create An Account</button>

            <div class="flex justify-center mt-5">
                <a href="">Lost Your Password</a>
            </div>
        </div>
    </div>

</div>
