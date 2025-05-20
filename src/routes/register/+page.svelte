<script>


    import SlidingRegister from "$lib/Components/SlidingRegister/SlidingRegister.svelte";
	import { cubicInOut, quadInOut } from "svelte/easing";
	import { fly, slide } from "svelte/transition";
    let menu = true;
    let menu2 = false;

    function toggle() {
        menu2 = false;
        menu = true
       
        
    }

    function toggle2(){
        menu2 = true;
        menu = false; 
    }
</script>



<main class="">
    <section class="h-screen flex items-center">

        <div class="w-full max-w-md mx-auto space-y-12">

            <h1 class="text-center text-2xl lg:text-4xl">My Account</h1>

            <div class="flex justify-center items-center gap-4 text-xl lg:text2xl">
                <a href="" on:click={toggle}> <h2 >Sign In</h2></a>
                
                <a href="" on:click={toggle2} ><h2 class="hover:text-black/40" >Create An Account</h2></a>
                
            </div>
            
            {#if menu}

                <div 
                    class="flex flex-col gap-10"
                  
                  
                >

                    <div class="border-b-1 w-full">
                        <input type="email" placeholder="Email" class="border-none">
                    </div>

                    <div class="border-b-1 w-full">
                        <input type="password" placeholder="Password"  class="border-none">
                    </div>

                    <div class="flex items-center gap-2">

                        <span class="size-4 border-1"></span>
                        <span class="text-4">Remember me</span>

                    </div>

                    <button class="w-full p-4 bg-black text-white">Sign in</button>

                    <a href="#" class="text-center">Lost Your Password</a>
                </div>

            {/if}
            
        
           {#if menu2}
                <div class="flex flex-col gap-10"
                    in:fly={{}}
                    out:fly={{}}
                >

                    <div class="border-b-1 w-full">
                        <input type="email" placeholder="Email" class="border-none">
                    </div>

                    <div class="border-b-1 w-full">
                        <input type="password" placeholder="Password"  class="border-none">
                    </div>

                    <div class="border-b-1 w-full">
                        <input type="password" placeholder="Confirm Password"  class="border-none">
                    </div>

            
                    
                    
                    <button class="w-full p-4 bg-black text-white">Sign Up</button>
                </div>
           {/if}

        </div>
        
    </section>
</main>