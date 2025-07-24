<script lang="ts">
	import { cartWithProducts, cartTotal, itemCount, clearCart } from '$lib/stores/cart';
	import { selectedCurrency, formatPrice } from '$lib/stores/currency';
	import { goto } from '$app/navigation';
	import type { DeliveryData, PaymentData, Order } from '$lib/types';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
  
	let isLoading = true;
	let isOpen = false;
	$: $cartWithProducts, (isLoading = false);
  
	let paymentData: PaymentData = {
	  email: '',
	  cardNumber: '',
	  expiryDate: '',
	  securityCode: '',
	  nameOnCard: '',
	  billingAddress: {
		firstName: '',
		lastName: '',
		address: '',
		apartment: '',
		city: '',
		country: '',
		region: '',
		postalCode: ''
	  },
	  saveInfo: false,
	  sameAsShipping: true
	};
  
	let formData: DeliveryData = {
	  country: '',
	  firstName: '',
	  lastName: '',
	  address: '',
	  apartment: '',
	  postalCode: '',
	  region: '',
	  phone: ''
	};
  
	const countries = [
	  { value: 'US', label: 'United States' },
	  { value: 'CA', label: 'Canada' },
	  { value: 'UK', label: 'United Kingdom' },
	  { value: 'FR', label: 'France' },
	  { value: 'DE', label: 'Germany' },
	  { value: 'IT', label: 'Italy' },
	  { value: 'ES', label: 'Spain' },
	  { value: 'AU', label: 'Australia' },
	  { value: 'JP', label: 'Japan' },
	  { value: 'BR', label: 'Brazil' }
	];
  
	const regions = [
	  { value: 'AL', label: 'Alabama' },
	  { value: 'AK', label: 'Alaska' },
	  // ... (rest of the regions remain unchanged)
	  { value: 'WY', label: 'Wyoming' }
	];
  
	function formatCardNumber(value: string): string {
	  const cleaned = value.replace(/\s/g, '');
	  const match = cleaned.match(/\d{1,4}/g);
	  return match ? match.join(' ') : '';
	}
  
	function formatExpiryDate(value: string): string {
	  const cleaned = value.replace(/\D/g, '');
	  if (cleaned.length >= 2) {
		return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
	  }
	  return cleaned;
	}
  
	function handleCardNumberInput(event: Event) {
	  const target = event.target as HTMLInputElement;
	  paymentData.cardNumber = formatCardNumber(target.value);
	}
  
	function handleExpiryInput(event: Event) {
	  const target = event.target as HTMLInputElement;
	  paymentData.expiryDate = formatExpiryDate(target.value);
	}
  
	function handleSecurityCodeInput(event: Event) {
	  const target = event.target as HTMLInputElement;
	  paymentData.securityCode = target.value.replace(/\D/g, '').substring(0, 4);
	}
  
	const SHIPPING_RATE = 9.99;
	const TAX_RATE = 0.08625;
  
	$: subtotal = $cartTotal;
	$: shipping = $itemCount > 0 ? SHIPPING_RATE : 0;
	$: tax = subtotal * TAX_RATE;
	$: total = subtotal + shipping + tax;
  
	// Validation function
	function validateForm(): boolean {
	  if (
		!formData.country ||
		!formData.firstName ||
		!formData.lastName ||
		!formData.address ||
		!formData.postalCode ||
		!formData.region ||
		!formData.phone
	  ) {
		alert('Please fill in all required delivery fields.');
		return false;
	  }
	  if (
		!paymentData.email ||
		!paymentData.cardNumber ||
		!paymentData.expiryDate ||
		!paymentData.securityCode ||
		!paymentData.nameOnCard
	  ) {
		alert('Please fill in all required payment fields.');
		return false;
	  }
	  if (!paymentData.sameAsShipping) {
		if (
		  !paymentData.billingAddress.firstName ||
		  !paymentData.billingAddress.lastName ||
		  !paymentData.billingAddress.address ||
		  !paymentData.billingAddress.city ||
		  !paymentData.billingAddress.country ||
		  !paymentData.billingAddress.region ||
		  !paymentData.billingAddress.postalCode
		) {
		  alert('Please fill in all required billing address fields.');
		  return false;
		}
	  }
	  return true;
	}

	
	// Order processing functions
	function generateOrderId(): string {
	  return Date.now().toString();
	}
  
	function createOrder(
	  delivery: DeliveryData,
	  payment: PaymentData,
	  items: (Product & { quantity: number })[],
	  orderTotal: number
	): Order {
	  return {
		id: generateOrderId(),
		delivery,
		payment,
		items,
		total: orderTotal,
		timestamp: new Date().toISOString()
	  };
	}
  
	function saveOrderToLocalStorage(order: Order) {
	  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
	  orders.push(order);
	  localStorage.setItem('orders', JSON.stringify(orders));
	}
  
	// Form submission handler
	async function handleFormSubmit() {
	  if (!validateForm()) {
		return;
	  }
  
	  const order = createOrder(formData, paymentData, $cartWithProducts, total);
	  saveOrderToLocalStorage(order);
	  clearCart();
	  goto(`/order-confirmation?orderId=${order.id}`);
	}

	function toggleDropdown() {
    isOpen = !isOpen;
  }
  </script>


<main class="flex flex-col justify-center items-center min-h-screen w-full md:h-screen md:flex-row">

	<div class="relative bg-gray-100 w-full md:md:hidden">

		<div class="px-4 flex justify-between mt-3 ">

			<button class="flex justify-between items-center gap-2 mt-2" on:click={toggleDropdown} aria-expanded={isOpen} aria-haspopup="true">
				<span class="text-xs mb-4">Order summary</span>
				<Icon icon="mdi:chevron-down" class="mb-4 w-6 h-6 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"/>
			</button>

			<span class="mt-2">{formatPrice(total, $selectedCurrency)}</span>
		</div>

		{#if isOpen}

			<div class="absolute w-full bg-gray-100 px-4 py-8" in:slide={{axis:'y', delay: 200, duration: 500, easing: quartOut}} out:slide={{axis:'y', delay: 200, duration: 500, easing: quartOut}}>
				{#if isLoading}
					<div class="text-center py-8">
						<p class="text-gray-500 mb-4">Loading cart...</p>
					</div>
				{:else if $itemCount > 0}
					<!-- Items -->
					<div class="space-y-3 mb-4">
						{#each $cartWithProducts as item}
							<div class="flex justify-between items-center text-sm gap-4">
								<div class="relative flex items-center gap-2">
									<img src={item.imageUrls[0]} alt="" class="size-16">
									<span class="absolute bottom-13 left-13 text-white text-center bg-black/50 rounded-full size-5">{item.quantity}</span>
									<span class="text-gray-600 ">{item.name} </span>
								</div>
								
								<span class="text-gray-900">{formatPrice(item.price * item.quantity, $selectedCurrency)}</span>
							</div>
						{/each}
					</div>

						<hr class="border-gray-200 mb-4" />

						<!-- Totals -->
						<div class="space-y-2 text-sm">
							<div class="flex justify-between">
								<span class="text-gray-600">Subtotal {$itemCount} items</span>
								<span class="text-gray-900">{formatPrice(subtotal, $selectedCurrency)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Shipping</span>
								<span class="text-gray-900">{formatPrice(shipping, $selectedCurrency)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Tax</span> 
								<span class="text-gray-900">{formatPrice(tax, $selectedCurrency)}</span>
							</div>
						</div>

						<hr class="border-gray-200 my-4" />

						<div class="flex justify-between text-lg font-medium">
							<span class="font-bold">Total</span>
							<span class="text-gray-900">{formatPrice(total, $selectedCurrency)}</span>
						</div>
				{:else}
					<!-- Empty Cart Message -->
					<div class="text-center py-8">
						<p class="text-gray-500 mb-4">Your cart is empty</p>
						<a href="/" class="text-blue-600 hover:text-blue-700 font-medium">
							Continue shopping
						</a>
					</div>
				{/if}
				</div>
		{/if}
	</div>

	

</main>






