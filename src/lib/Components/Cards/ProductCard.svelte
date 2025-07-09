<script lang="ts">
    import Icon from "@iconify/svelte";
    import Rating from "../Ratings/Rating.svelte";
    import type { Product } from "$lib/data/products";
    import { goto } from "$app/navigation";

    export let product: Product;
    function handleClick(){
        goto('/products/{product.id}');
    }
    
</script>

<a href="/products/{product.id}" class="card group relative overflow-hidden">
    <!-- Image container with favorite icon -->
    <div class="w-45 h-60 relative overflow-hidden lg:w-80 lg:h-96">
        <img src={product.imageUrl} alt={product.name} class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
    </div>
    
    <div class="absolute top-[2%] left-[57%] group/icon cursor-pointer transition-all duration-500 lg:left-[90%] ">
        <!-- Outlined heart (default) -->
        <Icon
          icon="mdi:heart-outline"
          class="size-7 block group-hover/icon:hidden transition-colors"
        />
    
        <!-- Red filled heart (on hover) -->
        <Icon
          icon="mdi:heart"
          class="size-7 hidden group-hover/icon:block transition-colors"
          style="color: #f00"
        />
    </div>

    <div class="lg:absolute lg:inset-x-0 flex justify-center lg:translate-y-0 lg:transition-transform opacity-0 
                lg:group-hover:-translate-y-10 lg:group-hover:opacity-100
                lg:trasition-all lg:duration-300 lg:ease-out">
                
        <button class="bg-black text-white w-60 h-8 rounded-md">
            Quick Buy
        </button>
    </div>

    <!--
        translate-y-0 pushes the button down to stay below the image
        opacity-0 makes it invisible
        group-hover:-translate-y-10 moves the button up
        group-hover:opacity-100 making it visible

    -->
    
    <!-- Product info -->
    <div class="space-y-2">
        <p class="font-medium lg:text-lg">{product.name}</p>
        <p class="text-gray-600 text-[14px] lg:text-sm">{product.description}</p>
        <p class="font-bold lg:text-lg"><span>$</span>{product.price}</p>
    </div>
</a>