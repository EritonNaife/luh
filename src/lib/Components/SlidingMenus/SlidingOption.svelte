<script lang="ts">
	import Icon from "@iconify/svelte";
	import type { Product } from "$lib/data/products";
	import { cubicInOut } from "svelte/easing";
	import { scale, slide, fade } from "svelte/transition";
	import { formatPrice, selectedCurrency } from '$lib/stores/currency';

	export let closeMenu: () => void = () => {};
	export let product: Product;
	export let onAddToCart: (productId: string, size: string, quantity: number) => void = () => {};

	// Size options with pricing (matching your main product page)
	const sizeOptions = [
		{ value: '220g', label: '220g', priceMultiplier: 1, priceLabel: '' },
		{ value: '320g', label: '320g', priceMultiplier: 1.3, priceLabel: '+30%' }
	];

	// State management
	let selectedSize = '220g';
	let quantity = 1;
	let isLoading = false;

	// Get current price based on selected size
	function getCurrentPrice(): number {
		const selectedOption = sizeOptions.find(option => option.value === selectedSize);
		return product.price * (selectedOption?.priceMultiplier || 1);
	}

	// Update quantity with bounds checking
	function updateQuantity(delta: number) {
		quantity = Math.max(1, quantity + delta);
	}

	// Handle add to cart
	async function handleAddToCart() {
		isLoading = true;
		try {
			await onAddToCart(product.id, selectedSize, quantity);
			closeMenu(); // Close modal after successful add
		} catch (error) {
			console.error('Error adding to cart:', error);
		} finally {
			isLoading = false;
		}
	}

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}

	// Focus management
	let modalElement: HTMLElement;
	let firstFocusableElement: HTMLElement;
	let lastFocusableElement: HTMLElement;

	function trapFocus(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			const focusableElements = modalElement.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			firstFocusableElement = focusableElements[0] as HTMLElement;
			lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

			if (event.shiftKey) {
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					event.preventDefault();
				}
			} else {
				if (document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					event.preventDefault();
				}
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Mobile Version -->
<div class="fixed inset-0 z-50 lg:hidden text-[#737373]">
	<!-- Backdrop -->
	<div class="fixed inset-0 bg-black/20" 
		 on:click={closeMenu} 
		 on:keydown={trapFocus}
		 transition:fade={{duration: 200}}
	></div>

	<!-- Modal -->
	<div 
		class="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-xl"
		transition:slide={{duration: 300, axis: 'y', easing: cubicInOut}}
		bind:this={modalElement}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<div class="p-6 space-y-6">
			<!-- Header -->
			<div class="flex items-center justify-between">
				<h2 id="modal-title" class="text-lg font-semibold ">
					{product.name}
				</h2>
				<button 
					class="p-2 hover:bg-gray-100 rounded-full transition-colors"
					on:click={closeMenu}
					aria-label="Close modal"
				>
					<Icon icon="ei:close" class="w-5 h-5" />
				</button>
			</div>

			<!-- Product Image (Mobile) -->
			<div class="flex justify-center">
				<img 
					src={product.imageUrl} 
					alt={product.name}
					class="w-24 h-24 object-cover rounded-lg"
				/>
			</div>

			<!-- Price -->
			<div class="text-center">
				<p class="text-2xl font-bold">
					{formatPrice(getCurrentPrice(), $selectedCurrency)}
				</p>
			</div>

			<!-- Size Selection -->
			<div class="space-y-3">
				<h3 class="text-sm font-medium">Select Size:</h3>
				<div class="flex gap-3 justify-center">
					{#each sizeOptions as option}
						<label class="flex-1">
							<input
								type="radio"
								name="size-mobile"
								value={option.value}
								bind:group={selectedSize}
								class="sr-only"
							/>
							<div class="relative border-2 rounded-lg px-4 py-3 cursor-pointer transition-colors text-center {selectedSize === option.value 
								? 'border-gray-900 bg-gray-900 text-white' 
								: 'border-gray-300 hover:border-gray-400'}">
								<span class="font-medium">{option.label}</span>
								{#if option.priceLabel}
									<span class="text-xs block {selectedSize === option.value ? 'text-[#737373]' : 'text-[#737373]'}">
										{option.priceLabel}
									</span>
								{/if}
							</div>
						</label>
					{/each}
				</div>
			</div>

			<!-- Quantity Selection -->
			<div class="space-y-3">
				<h3 class="text-sm font-medium ">Quantity:</h3>
				<div class="flex items-center justify-center gap-4">
					<button
						type="button"
						class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						on:click={() => updateQuantity(-1)}
						disabled={quantity <= 1}
						aria-label="Decrease quantity"
					>
						<Icon icon="ei:minus" class="w-4 h-4" />
					</button>
					
					<input
						type="number"
						min="1"
						bind:value={quantity}
						class="w-16 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						aria-label="Quantity"
					/>
					
					<button
						type="button"
						class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
						on:click={() => updateQuantity(1)}
						aria-label="Increase quantity"
					>
						<Icon icon="ei:plus" class="w-4 h-4" />
					</button>
				</div>
			</div>

			<!-- Add to Cart Button -->
			<button
				type="button"
				class="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				on:click={handleAddToCart}
				disabled={isLoading}
			>
				{isLoading ? 'Adding...' : `Add to Cart - ${formatPrice(getCurrentPrice() * quantity, $selectedCurrency)}`}
			</button>
		</div>
	</div>
</div>

<!-- Desktop Version -->
<div class="hidden lg:block fixed inset-0 z-50 text-[#737373]">
	<!-- Backdrop -->
	<div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4" 
		 on:click={closeMenu}
		 transition:fade={{duration: 200}}
	></div>

	<!-- Modal -->
	<div 
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
		transition:scale={{duration: 400, easing: cubicInOut}}
		bind:this={modalElement}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title-desktop"
		on:keydown={trapFocus}
	>
		<div class="p-6">
			<!-- Header -->
			<div class="flex justify-between items-center mb-6">
				<h2 id="modal-title-desktop" class="text-2xl font-bold text-[#737373]">
					{product.name}
				</h2>
				<button 
					class="p-2 hover:bg-gray-100 rounded-full transition-colors"
					on:click={closeMenu}
					aria-label="Close modal"
				>
					<Icon icon="ei:close" class="w-6 h-6" />
				</button>
			</div>

			<!-- Content -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Product Image -->
				<div class="flex justify-center">
					<img 
						src={product.imageUrl} 
						alt={product.name}
						class="w-full max-w-md aspect-square object-cover rounded-lg"
					/>
				</div>

				<!-- Product Details -->
				<div class="space-y-6">
					<!-- Price -->
					<div>
						<p class="text-3xl font-bold text-[#737373]">
							{formatPrice(getCurrentPrice(), $selectedCurrency)}
						</p>
					</div>

					<!-- Stock Status -->
					<div class="flex items-center gap-2">
						<div class="w-2 h-2 bg-green-500 rounded-full"></div>
						<span class="text-sm text-green-600 font-medium">In stock</span>
					</div>

					<!-- Size Selection -->
					<div class="space-y-3">
						<h3 class="text-sm font-medium text-[#737373]">Select Size:</h3>
						<div class="flex gap-3">
							{#each sizeOptions as option}
								<label>
									<input
										type="radio"
										name="size-desktop"
										value={option.value}
										bind:group={selectedSize}
										class="sr-only"
									/>
									<div class="relative border-2 rounded-md px-4 py-3 cursor-pointer transition-colors {selectedSize === option.value 
										? 'border-gray-900 bg-gray-900 text-white' 
										: 'border-gray-300 hover:border-gray-400'}">
										<span class="font-medium">{option.label}</span>
										{#if option.priceLabel}
											<span class="text-xs block {selectedSize === option.value ? 'text-gray-300' : 'text-gray-500'}">
												{option.priceLabel}
											</span>
										{/if}
									</div>
								</label>
							{/each}
						</div>
					</div>

					<!-- Quantity Selection -->
					<div class="space-y-3">
						<h3 class="text-sm font-medium text-[#737373]">Quantity:</h3>
						<div class="flex items-center gap-3">
							<button
								type="button"
								class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								on:click={() => updateQuantity(-1)}
								disabled={quantity <= 1}
								aria-label="Decrease quantity"
							>
								<Icon icon="ei:minus" class="w-4 h-4" />
							</button>
							
							<input
								type="number"
								min="1"
								bind:value={quantity}
								class="w-20 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								aria-label="Quantity"
							/>
							
							<button
								type="button"
								class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
								on:click={() => updateQuantity(1)}
								aria-label="Increase quantity"
							>
								<Icon icon="ei:plus" class="w-4 h-4" />
							</button>
						</div>
					</div>

					<!-- Product Description -->
					{#if product.description}
						<div class="space-y-2">
							<h3 class="text-sm font-medium text-[#737373]">Description:</h3>
							<p class="text-sm text-[#737373]">{product.description}</p>
						</div>
					{/if}

					<!-- Add to Cart Button -->
					<button
						type="button"
						class="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						on:click={handleAddToCart}
						disabled={isLoading}
					>
						{isLoading ? 'Adding...' : `Add to Cart - ${formatPrice(getCurrentPrice() * quantity, $selectedCurrency)}`}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>