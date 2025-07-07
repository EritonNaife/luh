<script lang="ts">
	import '../app.css';
	import Header from '$lib/Components/Header.svelte';
	import Footer from '$lib/Components/Footer.svelte';
	import { initializeExchangeRates } from '$lib/stores/currency';
</script>


<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<Header/>

	<slot/>

	<Footer/>
</div>
