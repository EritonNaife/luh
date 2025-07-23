// Enhanced version with improvements
<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import { quartInOut } from 'svelte/easing';
	import { formatPrice, selectedCurrency } from '$lib/stores/currency';
	import { cartWithProducts, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } from '$lib/stores/cart';
	import type { Product } from '$lib/data/products';
	import { goto } from '$app/navigation';
	
	export let isMenuOpen = false;
	export let closeMenu: () => void = () => {};
	
	// Loading states for better UX
	let updatingItems = new Set<string>();
	let isCheckingOut = false;
	
	// Helper function to get the first image URL
	function getImageUrl(product: Product): string {
		return product.imageUrls[0] || '';
	}
	
	// Enhanced quantity handlers with loading states
	async function handleIncreaseQuantity(itemId: string) {
		updatingItems.add(itemId);
		updatingItems = updatingItems; // Trigger reactivity
		
		try {
			await increaseQuantity(itemId);
		} finally {
			updatingItems.delete(itemId);
			updatingItems = updatingItems;
		}
	}
	
	async function handleDecreaseQuantity(itemId: string) {
		updatingItems.add(itemId);
		updatingItems = updatingItems;
		
		try {
			await decreaseQuantity(itemId);
		} finally {
			updatingItems.delete(itemId);
			updatingItems = updatingItems;
		}
	}
	
	// Enhanced remove with confirmation for expensive items
	function handleRemoveItem(item: any) {
		if (item.price * item.quantity > 100) {
			if (confirm(`Remove ${item.name} from cart? This will remove $${(item.price * item.quantity).toFixed(2)} worth of items.`)) {
				removeFromCart(item.id);
			}
		} else {
			removeFromCart(item.id);
		}
	}
	
	// Enhanced checkout with loading state
	async function handleCheckout() {
		isCheckingOut = true;
		try {
			// Optional: Validate cart with server before checkout
			// await validateCartWithServer($cartWithProducts);
			
			closeMenu();
			await goto('/checkout');
		} catch (error) {
			console.error('Checkout error:', error);
			// Show error toast/notification
		} finally {
			isCheckingOut = false;
		}
	}
	
	// Keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}
	
	// Calculate individual item totals
	function getItemTotal(item: any): number {
		return item.price * item.quantity;
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Backdrop with better accessibility -->
<div
	class="fixed inset-0 bg-black/50 transition-opacity duration-300 z-40"
	class:opacity-0={!isMenuOpen}
	class:opacity-100={isMenuOpen}
	class:invisible={!isMenuOpen}
	class:visible={isMenuOpen}
	on:click={closeMenu}
	on:keydown={(e) => e.key === 'Enter' && closeMenu()}
	role="button"
	tabindex="-1"
	aria-label="Close cart"
></div>

<div
	class="fixed inset-y-0 top-0 right-0 w-full max-w-sm md:max-w-md h-full shadow-lg bg-white z-50 flex flex-col text-[#6B6B6B]"
	transition:slide={{ duration: 300, axis: 'x', easing: quartInOut }}
	role="dialog"
	aria-modal="true"
	aria-labelledby="cart-title"
>
	<div class="header p-5 flex justify-between items-center text-2xl border-b">
		<h1 id="cart-title">
			Cart 
			{#if $cartWithProducts.length > 0}
				<span class="text-sm font-normal">({$cartWithProducts.length} {$cartWithProducts.length === 1 ? 'item' : 'items'})</span>
			{/if}
		</h1>
		<button 
			on:click={closeMenu}
			class="hover:bg-gray-100 rounded p-1 transition-colors"
			aria-label="Close cart"
		>
			<Icon icon="ei:close" class="size-6" />
		</button>
	</div>
	
	<div class="p-5 content flex-1 flex-col gap-5 overflow-y-auto">
		{#if $cartWithProducts.length === 0}
			<div class="flex flex-col items-center justify-center h-full">
				<Icon icon="mdi:cart-outline" class="size-16 text-gray-300" />
				<p class="mt-4 text-center">Your cart is empty.</p>
			</div>
		{:else}
			{#each $cartWithProducts as item (item.id)}
				<div class="main-content grid grid-cols-3 items-center gap-4 py-4 border-b last:border-b-0" transition:slide>
					<div class="relative">
						<img 
							src={getImageUrl(item)} 
							alt={item.name} 
							class="w-24 h-24 object-cover rounded-md" 
							loading="lazy"
						/>
						{#if updatingItems.has(item.id)}
							<div class="absolute inset-0 bg-white/70 flex items-center justify-center rounded-md">
								<Icon icon="mdi:loading" class="animate-spin size-4" />
							</div>
						{/if}
					</div>
					
					<div class="info space-y-2 col-span-2">
						<h3 class="font-medium">{item.name}</h3>
						<div class="flex items-center gap-2">
							<p class="font-semibold">{formatPrice(item.price, $selectedCurrency)}</p>
							{#if item.quantity > 1}
								<span class="text-sm text-gray-500">each</span>
							{/if}
						</div>
						
						{#if item.type === 'weighted'}
							<p class="text-sm text-gray-500">Weight: {item.weight}g</p>
						{/if}
						
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-1 border rounded">
								<button 
									on:click={() => handleDecreaseQuantity(item.id)} 
									class="px-3 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
									disabled={updatingItems.has(item.id) || item.quantity <= 1}
									aria-label="Decrease quantity"
								>
									-
								</button>
								<span class="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
								<button 
									on:click={() => handleIncreaseQuantity(item.id)} 
									class="px-3 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
									disabled={updatingItems.has(item.id)}
									aria-label="Increase quantity"
								>
									+
								</button>
							</div>
							
							<div class="text-right">
								<p class="text-sm font-semibold">
									{formatPrice(getItemTotal(item), $selectedCurrency)}
								</p>
								<button 
									on:click={() => handleRemoveItem(item)} 
									class="text-red-500 hover:underline text-sm"
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
	
	{#if $cartWithProducts.length > 0}
		<div class="footer p-5 flex flex-col gap-3 border-t bg-gray-50">
			<div class="flex justify-between text-lg">
				<span>Subtotal</span>
				<strong>{formatPrice($cartTotal, $selectedCurrency)}</strong>
			</div>
			<p class="text-sm text-gray-600">Taxes and shipping calculated at checkout</p>
			<button
				class="w-full py-3 px-4 text-white bg-black rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				on:click={handleCheckout}
				disabled={isCheckingOut}
			>
				{#if isCheckingOut}
					<Icon icon="mdi:loading" class="animate-spin size-4" />
					Processing...
				{:else}
					Checkout
				{/if}
			</button>
		</div>
	{/if}
</div>