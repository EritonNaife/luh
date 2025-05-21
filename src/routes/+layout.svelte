<script lang="ts">
	import '../app.css';
	import Header from '$lib/Components/Header.svelte';
	import Footer from '$lib/Components/Footer.svelte';
</script>


<div class="">
	<Header/>

	<slot/>

	<Footer/>
</div>
