<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { formatPrice,selectedCurrency } from '$lib/stores/currency';
	import { products2 } from '$lib/data/products';


	export let data: PageData;

	const { product } = data;

	// State management
	let quantity = 1;
	let activeTab = 'description';
	let isLoading = false;
	let addToCartMessage = '';

	// Tab content (in real app, this would come from the product data)
	const tabContent = {
		description: product.description || 'Product description coming soon...',
		additional: 'Additional product information will be displayed here.',
		reviews: 'Customer reviews will be shown here.',
		usage: 'Instructions for product usage will be provided here.'
	};

	const tabs = [
		{ id: 'description', label: 'Description' },
		{ id: 'additional', label: 'Additional Information' },
		{ id: 'reviews', label: 'Reviews' },
		{ id: 'usage', label: 'Mode of use' }
	];

	let currentImageIndex = 0;

	function changeImage(index: number) {
		currentImageIndex = index;
	}

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % product.imageUrls.length;
	}

	function prevImage() {
		currentImageIndex = currentImageIndex === 0 ? product.imageUrls.length- 1 : currentImageIndex - 1;
	}

	function updateQuantity(delta: number) {
		quantity = Math.max(1, quantity + delta);
	}

	function handleAddToCart() {
		isLoading = true;
		// Simulate API call
		setTimeout(() => {
			isLoading = false;
			addToCartMessage = 'Added to cart!';
			setTimeout(() => {
				addToCartMessage = '';
			}, 3000);
		}, 500);
	}

	
</script>

<svelte:head>
	<title>{product.name} - Product Details</title>
	<meta name="description" content={product.description || `Buy ${product.name} for ${formatPrice(product.price,$selectedCurrency)}`} />
	<meta property="og:title" content={product.name} />
	<meta property="og:description" content={product.description || `Buy ${product.name} for ${formatPrice(product.price,$selectedCurrency)}`} />
	<meta property="og:image" content={product.imageUrls[0]} />
	<meta property="og:url" content={$page.url.toString()} />
</svelte:head>

<main class="mt-30 mb-250 min-h-screen bg-gray-50 text-[#333333] lg:mb-150">
	<!-- Product Hero Section -->
	<section 
		class="bg-white py-8 lg:py-16"
		aria-labelledby="product-title"
	>
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="flex flex-col lg:flex-row gap-8 lg:gap-16">
			<!-- Product Image Gallery -->
			<div class="flex-1 flex justify-center">
				<div class="w-full max-w-md lg:max-w-lg">
					<!-- Main Image -->
					<div class="relative mb-4">
						<img 
							src={product.imageUrls[currentImageIndex]} 
							alt={product.name}
							class="w-full aspect-square object-cover object-center rounded-lg shadow-lg"
							loading="eager"
						/>
						
						<!-- Navigation arrows -->
						<button
							type="button"
							class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
							on:click={prevImage}
							aria-label="Previous image"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						
						<button
							type="button"
							class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
							on:click={nextImage}
							aria-label="Next image"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>

					<!-- Image Thumbnails -->
					<div class="flex gap-2 justify-center">
						{#each product.imageUrls as image, index}
							<button
								type="button"
								class="w-16 h-16 rounded-md overflow-hidden border-2 transition-colors {currentImageIndex === index 
									? 'border-gray-900' 
									: 'border-gray-200 hover:border-gray-400'}"
								on:click={() => changeImage(index)}
								aria-label={`View ${product.name}`}
							>
								<img 
									src={image} 
									alt={product.name}
									class="w-full h-full object-cover object-center"
								/>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Product Information -->
			<div class="flex-1 space-y-6">
				<div>
					<h1 id="product-title" class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
						{product.name}
					</h1>
					<p class="text-3xl font-semibold text-gray-900">
						{formatPrice(product.price,$selectedCurrency)}
					</p>
					
				</div>

				<!-- Stock Status -->
				<div class="flex items-center gap-2">
					<div class="w-2 h-2 bg-green-500 rounded-full"></div>
					<span class="text-sm text-green-600 font-medium">In stock</span>
				</div>

				<!-- Quantity Selection -->
				<div class="flex items-center gap-3">
					<label for="quantity" class="text-sm font-medium text-gray-700">
						Quantity:
					</label>
					<div class="flex items-center border border-gray-300 rounded-md">
						<button
							type="button"
							class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
							on:click={() => updateQuantity(-1)}
							disabled={quantity <= 1}
							aria-label="Decrease quantity"
						>
							-
						</button>
						<input
							id="quantity"
							type="number"
							min="1"
							bind:value={quantity}
							class="w-16 text-center border-x border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							aria-label="Product quantity"
						/>
						<button
							type="button"
							class="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
							on:click={() => updateQuantity(1)}
							aria-label="Increase quantity"
						>
							+
						</button>
					</div>
				</div>
				<div class="space-y-4">
					<!-- Add to Cart Button -->
					<button
						type="button"
						class="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						on:click={handleAddToCart}
						disabled={isLoading}
						aria-describedby={addToCartMessage ? 'cart-message' : undefined}
					>
						{isLoading ? 'Adding...' : `Add to Cart - ${formatPrice(quantity*product.price,$selectedCurrency)}`}
					</button>

					{#if addToCartMessage}
						<div id="cart-message" class="text-green-600 text-sm font-medium" role="status">
							{addToCartMessage}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	</section>

	<!-- Product Details Section -->
	<section class="bg-white border-t" aria-labelledby="details-title">
		<div class="container mx-auto px-4 max-w-7xl py-8">
			<h2 id="details-title" class="sr-only">Product Details</h2>
			
			<div class="flex flex-col lg:flex-row gap-8">
				<!-- Tab Navigation -->
				<nav class="lg:w-1/4" aria-label="Product information tabs">
					<ul class="space-y-2 lg:space-y-4">
						{#each tabs as tab}
							<li>
								<button
									type="button"
									class="w-full text-left px-4 py-2 rounded-md transition-colors {activeTab === tab.id 
										? 'bg-gray-100 text-gray-900 font-medium' 
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}"
									on:click={() => activeTab = tab.id}
									aria-current={activeTab === tab.id ? 'page' : undefined}
								>
									<span class="hidden lg:inline-block mr-2 font-bold">-</span>
									{tab.label}
								</button>
							</li>
						{/each}
					</ul>
				</nav>

				<!-- Tab Content -->
				<div class="lg:w-3/4 lg:border-l lg:pl-8">
					<div class="prose prose-gray max-w-none">
						{#if activeTab === 'description'}
							<div>
								<h3 class="text-lg font-semibold mb-4">Description</h3>
								<p>{tabContent.description}</p>
							</div>
						{:else if activeTab === 'additional'}
							<div>
								<h3 class="text-lg font-semibold mb-4">Additional Information</h3>
								<p>{tabContent.additional}</p>
							</div>
						{:else if activeTab === 'reviews'}
							<div>
								<h3 class="text-lg font-semibold mb-4">Reviews</h3>
								<p>{tabContent.reviews}</p>
							</div>
						{:else if activeTab === 'usage'}
							<div>
								<h3 class="text-lg font-semibold mb-4">Mode of Use</h3>
								<p>{tabContent.usage}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Related Products Section -->
	<section class="bg-gray-50 py-16" aria-labelledby="related-title">
		<div class="container mx-auto px-4 max-w-7xl">
			<h2 id="related-title" class="text-2xl font-bold text-gray-900 mb-8">
				Related Products
			</h2>
			
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<!-- Placeholder for related products -->
				<!-- In a real app, you would loop through 
					
					data.relatedProducts {#each Array(4) as _, i}
					<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<div class="aspect-square bg-gray-200 flex items-center justify-center">
							<span class="text-gray-500">Product {i + 1}</span>
						</div>
						<div class="p-4">
							<h3 class="font-medium text-gray-900 mb-2">Related Product {i + 1}</h3>
							<p class="text-gray-600">{formatPrice(product.price,$selectedCurrency)}</p>
						</div>
					</div>
				{/each}-->
				
			</div>
		</div>
	</section>
</main>

<style>
	/* Custom styles for better focus indicators */
	button:focus-visible,
	input:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}
</style>