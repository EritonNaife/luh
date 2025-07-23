<script lang="ts">
	import '../app.css';
	import Header from '$lib/Components/Header.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import { initializeExchangeRates } from '$lib/stores/currency';
	import { goto } from '$app/navigation';

	function handleSelectProduct(event: CustomEvent<{ productId: string }>) {
    goto(`/products/${event.detail.productId}`);
  }
</script>


<div class="text-[#2F2F2F] grid h-screen grid-rows-[auto_1fr_auto]">
	<Header on:selectProduct={handleSelectProduct}/>

	<slot/>

	<Footer/>
</div>
