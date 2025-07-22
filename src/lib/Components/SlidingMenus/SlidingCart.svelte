<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';
    import { formatPrice,selectedCurrency } from '$lib/stores/currency';
    
	
    // --- 1. Imports for cart logic ---
	import cart, { 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        cartTotal 
    } from '$lib/stores/cart';
	import type { AnyProduct } from '$lib/data/products';
	import { goto } from '$app/navigation';

	export let isMenuOpen = false;
	export let closeMenu: () => void = () => {};

	// --- 2. Helper function to get the correct image URL ---
	function getImageUrl(p: AnyProduct): string {
		if ('imageUrl' in p) {
			return p.imageUrl; // For Product type
		}
		return p.imageUrls[0] || ''; // For Product2 type, with a fallback
	}

    function handleClick(){
        goto(`/checkout`);
        closeMenu();
    }

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
	class="fixed inset-y-0 top-0 right-0 w-full max-w-sm md:max-w-md h-full shadow-lg bg-white z-50 flex flex-col"
	transition:slide={{ duration: 300, axis: 'x', easing: quartInOut }}
>
	<div class="header p-5 flex justify-between items-center text-2xl border-b">
		<h1 class="">Cart</h1>
		<button on:click={closeMenu}><Icon icon="ei:close" class="size-6" /></button>
	</div>

    <div class="p-5 content flex-1 flex-col gap-5 overflow-y-auto">
        {#if $cart.length === 0}
            <div class="flex flex-col items-center justify-center h-full">
                <Icon icon="mdi:cart-outline" class="size-16" />
                <p class="mt-4">Your cart is empty.</p>
            </div>
        {:else}
            {#each $cart as item (item.productId)}
                <div class="main-content grid grid-cols-3 items-center gap-4 py-4 border-b" transition:slide>
                    
                    <img src={getImageUrl(item.product)} alt={item.product.name} class="w-24 h-24 object-cover rounded-md" />

                    <div class="info space-y-2 col-span-2">
                        <h3>{item.product.name}</h3>
                        <p class="">{formatPrice(item.product.price,$selectedCurrency)}</p>
                        <div class="flex items-center gap-4 text-sm">
                            <div class="flex items-center gap-3 border rounded">
                                <button on:click={() => decreaseQuantity(item.productId)} class="px-2 py-1">-</button>
                                <span>{item.quantity}</span>
                                <button on:click={() => increaseQuantity(item.productId)} class="px-2 py-1">+</button>
                            </div>
                            <button on:click={() => removeFromCart(item.productId)} class="text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>
                </div>
            {/each}
        {/if}

	</div>


	{#if $cart.length > 0}
	<div class="footer p-5 flex flex-col gap-3 border-t bg-gray-50">
        <div class="flex justify-between text-lg">
            <span>Subtotal</span>
            <strong>{formatPrice($cartTotal,$selectedCurrency)}</strong>
        </div>
		<p class="text-sm">Taxes and shipping calculated at checkout</p>
		<button class="mx-auto py-2 px-16 text-white bg-black rounded-md hover:bg-gray-800 transition-colors" on:click={handleClick}>Checkout</button>
	</div>
    {/if}
</div>