<script lang="ts">
	import cart, { cartTotal, itemCount } from '$lib/stores/cart';
	import type { AnyProduct } from '$lib/data/products';
	import { enhance } from '$app/forms';
    import { selectedCurrency, formatPrice } from '$lib/stores/currency';
	import type { SubmitFunction } from '@sveltejs/kit';
    import { goto } from "$app/navigation";



	// This function runs after the form submission.
	// We use it to clear the cart only if the server-side action was successful.
	const handleFormSubmit: SubmitFunction = ({ result }) => {
		if (result.type === 'redirect') {
			clearCart();
			// SvelteKit will handle the redirection automatically.
		}
	};



     interface PaymentData {
    email: string;
    cardNumber: string;
    expiryDate: string;
    securityCode: string;
    nameOnCard: string;
    billingAddress: {
      firstName: string;
      lastName: string;
      address: string;
      apartment: string;
      city: string;
      country: string;
      region: string;
      postalCode: string;
    };
    saveInfo: boolean;
    sameAsShipping: boolean;
  }

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

  interface DeliveryData {
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    postalCode: string;
    region: string;
    phone: string;
  }

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
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  function handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  }

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
    const formatted = formatCardNumber(target.value);
    paymentData.cardNumber = formatted;
  }

  function handleExpiryInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const formatted = formatExpiryDate(target.value);
    paymentData.expiryDate = formatted;
  }

  function handleSecurityCodeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    paymentData.securityCode = target.value.replace(/\D/g, '').substring(0, 4);
  }

  const SHIPPING_RATE = 9.99;
  const TAX_RATE = 0.08625; // 8.625% tax rate

  // Reactive calculations based on cart
  $: subtotal = $cartTotal;
  $: shipping = $itemCount > 0 ? SHIPPING_RATE : 0;
  $: tax = subtotal * TAX_RATE;
  $: total = subtotal + shipping + tax;

</script>


<main class="min-h-screen w-full md:h-screen md:flex md:justify-center">
    
    <!-- Left side - Scrollable forms -->
    <div class="w-full md:overflow-y-auto md:flex md:justify-end my-40">
        <div class="p-8 space-y-12">
            <!-- Delivery Form -->
            <div class="w-full flex flex-col justify-center items-center">
                <h1 class="text-2xl font-bold text-gray-900 mb-10">Delivery Information</h1>
                
                <form on:submit={handleSubmit} class="space-y-6 w-full max-w-lg">
                    <!-- Country -->
                    <div>
                        <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                        </label>
                        <select
                            id="country"
                            bind:value={formData.country}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a country</option>
                            {#each countries as country}
                                <option value={country.value}>{country.label}</option>
                            {/each}
                        </select>
                    </div>

                    <!-- First Name & Last Name -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                bind:value={formData.firstName}
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div>
                            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                bind:value={formData.lastName}
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <!-- Address -->
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                            Address *
                        </label>
                        <input
                            type="text"
                            id="address"
                            bind:value={formData.address}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Street address"
                        />
                    </div>

                    <!-- Apartment (Optional) -->
                    <div>
                        <label for="apartment" class="block text-sm font-medium text-gray-700 mb-2">
                            Apartment, suite, etc. (optional)
                        </label>
                        <input
                            type="text"
                            id="apartment"
                            bind:value={formData.apartment}
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Apartment, suite, unit, building, floor, etc."
                        />
                    </div>

                    <!-- Postal Code & Region -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-2">
                                Postal Code *
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                bind:value={formData.postalCode}
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Postal code"
                            />
                        </div>
                        <div>
                            <label for="region" class="block text-sm font-medium text-gray-700 mb-2">
                                Region *
                            </label>
                            <select
                                id="region"
                                bind:value={formData.region}
                                required
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a region</option>
                                {#each regions as region}
                                    <option value={region.value}>{region.label}</option>
                                {/each}
                            </select>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            bind:value={formData.phone}
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Phone number"
                        />
                    </div>

                    
                </form>
            </div>

            <!-- Payment Form -->
            <div class="w-full flex flex-col justify-center items-center">
                <h1 class="text-2xl font-bold text-gray-900 mb-6">Payment</h1>
                
                <form on:submit={handleSubmit} class="space-y-6 w-full max-w-lg">
                    <!-- Contact Information -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Contact information
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={paymentData.email}
                            required
                            class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Email"
                        />
                    </div>

                    <!-- Payment Method -->
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Payment method</h3>
                        
                        <!-- Card Number -->
                        <div class="mb-4">
                            <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-2">
                                Card number
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={paymentData.cardNumber}
                                on:input={handleCardNumberInput}
                                required
                                maxlength="19"
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="1234 1234 1234 1234"
                            />
                        </div>

                        <!-- Expiry and Security Code -->
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-2">
                                    Expiration date (MM/YY)
                                </label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={paymentData.expiryDate}
                                    on:input={handleExpiryInput}
                                    required
                                    maxlength="5"
                                    class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label for="securityCode" class="block text-sm font-medium text-gray-700 mb-2">
                                    Security code
                                </label>
                                <input
                                    type="text"
                                    id="securityCode"
                                    value={paymentData.securityCode}
                                    on:input={handleSecurityCodeInput}
                                    required
                                    maxlength="4"
                                    class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="CVV"
                                />
                            </div>
                        </div>

                        <!-- Name on Card -->
                        <div class="mb-4">
                            <label for="nameOnCard" class="block text-sm font-medium text-gray-700 mb-2">
                                Name on card
                            </label>
                            <input
                                type="text"
                                id="nameOnCard"
                                bind:value={paymentData.nameOnCard}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Name on card"
                            />
                        </div>
                    </div>

                    <!-- Billing Address -->
                    <div>
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Billing address</h3>
                        
                        <!-- Same as shipping checkbox -->
                        <div class="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="sameAsShipping"
                                bind:checked={paymentData.sameAsShipping}
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label for="sameAsShipping" class="ml-2 block text-sm text-gray-700">
                                Same as shipping address
                            </label>
                        </div>

                        {#if !paymentData.sameAsShipping}
                        <!-- First Name & Last Name -->
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <input
                                    type="text"
                                    bind:value={paymentData.billingAddress.firstName}
                                    required
                                    class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    bind:value={paymentData.billingAddress.lastName}
                                    required
                                    class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>

                        <!-- Address -->
                        <div class="mb-4">
                            <input
                                type="text"
                                bind:value={paymentData.billingAddress.address}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Address"
                            />
                        </div>

                        <!-- Apartment -->
                        <div class="mb-4">
                            <input
                                type="text"
                                bind:value={paymentData.billingAddress.apartment}
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Apartment, suite, etc. (optional)"
                            />
                        </div>

                        <!-- City, Country, Region, Postal Code -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                bind:value={paymentData.billingAddress.city}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="City"
                            />
                            <select
                                bind:value={paymentData.billingAddress.country}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Country/Region</option>
                                {#each countries as country}
                                    <option value={country.value}>{country.label}</option>
                                {/each}
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <select
                                bind:value={paymentData.billingAddress.region}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">State</option>
                                {#each regions as region}
                                    <option value={region.value}>{region.label}</option>
                                {/each}
                            </select>
                            <input
                                type="text"
                                bind:value={paymentData.billingAddress.postalCode}
                                required
                                class="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Postal code"
                            />
                        </div>
                        {/if}
                    </div>

                    <!-- Save Information -->
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            id="saveInfo"
                            bind:checked={paymentData.saveInfo}
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label for="saveInfo" class="ml-2 block text-sm text-gray-700">
                            Save my information for a faster checkout
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                    >
                        Complete order
                    </button>

                    <!-- Security Notice -->
                    <p class="text-xs text-gray-500 text-center">
                        🔒 Your payment information is secure and encrypted
                    </p>
                </form>
            </div>
        </div>
    </div>

    <!-- Right side - Fixed Order Summary -->
    <div class="w-full h-full bg-gray-100 flex justify-start items-center shadow-xl">
        <div class="p-12">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
            
            {#if $itemCount > 0}
                <!-- Items -->
                <div class="space-y-3 mb-4">
                {#each $cart as item}
                    <div class="flex justify-between text-sm gap-4">
                        <span class="text-gray-600">{item.product.name} × {item.quantity}</span>
                        <span class="text-gray-900">{formatPrice(item.product.price * item.quantity,$selectedCurrency)}</span>
                    </div>
                {/each}
                </div>

                <hr class="border-gray-200 mb-4" />

                <!-- Totals -->
                <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="text-gray-900">{formatPrice(subtotal,$selectedCurrency)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Shipping</span>
                    <span class="text-gray-900">{formatPrice(shipping,$selectedCurrency)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Tax</span>
                    <span class="text-gray-900">{formatPrice(tax,$selectedCurrency)}</span>
                </div>
                </div>

                <hr class="border-gray-200 my-4" />

                <div class="flex justify-between text-lg font-medium">
                <span class="text-gray-900">Total</span>
                <span class="text-gray-900">{formatPrice(total,$selectedCurrency)}</span>
                </div>
            {:else}
                <!-- Empty Cart Message -->
                <div class="text-center py-8">
                <p class="text-gray-500 mb-4">Your cart is empty</p>
                <a href="/products" class="text-blue-600 hover:text-blue-700 font-medium">
                    Continue shopping
                </a>
                </div>
            {/if}
        </div>
    </div>
</main>