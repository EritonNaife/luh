<script lang="ts">
    import type { PageData } from "./$types";
    import ProductCard from "$lib/Components/Cards/ProductCard.svelte";
   
  
    export let data: PageData;
    const products =data.products;
    const product = data.product;
  
    // function handleAddToCart() {
    //   // Add product to cart using the store
    //   cartStore.update(items => {
    //     const existingItem = items.find(item => item.id === product.id);
    //     if (existingItem) {
    //       existingItem.quantity += 1;
    //     } else {
    //       items.push({ ...product, quantity: 1 });
    //     }
    //     return items;
    //   });
    //   alert(`${product.name} added to cart!`); // Simple confirmation
    // }
  </script>

  <main>

    <section id="" class="h-screen flex flex-col justify-center items-center lg:flex-row">

      <div class="w-100 h-100 lg:w-150 lg:h-150 flex lg:items-center">
        <img src="/images/ChatGPT Image Apr 27, 2025, 02_33_59 PM.png" alt={product.name}   class="aspect-[1/1]">
      </div>

      <div class="flex flex-col gap-5">
        <h2>{product.name}</h2>
        <span>{product.price}€</span>
        <p>in stock</p>
        <div class="flex gap-3">
          <button class="border-2 p-1 w-30">quantity</button>
          <button class="p-2 bg-black text-white w-50">Add to cart</button>
        </div>
      </div>

    </section>

  
    <section id="details" class="flex justify-center">

      <div class="flex gap-10 py-4 border-t-2 w-100 lg:w-7xl lg:p-6 ">
        <ul class="space-y-5">
          <li class=""><div class="hidden lg:inline-flex"><span class="font-bold">-</span></div><a href="">Description</a></li>
          <li><div class="hidden lg:inline-flex"><span class="font-bold">-</span></div><a href="">Additional Information</a></li>
          <li><div class="hidden lg:inline-flex"><span class="font-bold">-</span></div><a href="">Reviews</a></li>
          <li><div class="hidden lg:inline-flex"><span class="font-bold">-</span></div><a href="">Mode of use</a></li>
        </ul>

        <div class="content h-45 lg:border-l-2">

        </div>
      </div>
    </section>

    <section id="related" class="mt-10 flex justify-center">

      <div class="w-100 h-150 flex flex-col gap-10 lg:w-350">

        <h2 class="text-2xl">Related Products</h2>

        <div class="cards lg:flex justify-center gap-5">
          {#each products as product}
            <ProductCard {product}/>
          {/each}
        </div>
      </div>

    </section>
    
  </main>