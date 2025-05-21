<script lang="ts">
    import Collection from "$lib/Components/Cards/Collection.svelte";
    import ProductCard from "$lib/Components/Cards/ProductCard.svelte";
    import ProductSlider from "$lib/Components/Slider/ProductSlider.svelte";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
	import { fade, fly, slide } from "svelte/transition";
	import { cubicIn, quartOut } from "svelte/easing";

    function handleClick(){
        goto('/products');
    }
    
    export let data:PageData;
    
</script>



<style>
	@media screen and (min-width: 500px) {
		:global(#slidy_cards .slidy-ul li) {width: 70vw;}
	}	
	@media screen and (min-width: 600px) {
		:global(#slidy_cards .slidy-ul li) {width: 50vw;}
	}
	@media screen and (min-width: 700px) {
		:global(#slidy_cards .slidy-ul li) {width: 33vw;}
	}
	:global(#slidy_cards .slidy-ul li img) {
			transform: scale(1);
			transition: transform 350ms, box-shadow 350ms;
	}
	:global(#slidy_cards .slidy-ul li) {overflow: visible}
	:global(#slidy_cards .slidy-ul li.active img) {
			transform: scale(1.15);
			box-shadow: 0 14px 25px rgba(0, 0, 0, 0.36);
	}
	:global(body) { margin: 0; padding: 0}
	.slide {
		position: relative;
		display: flex;
		flex-flow: column;
		text-align: center;
		align-content: center;
		justify-content: center;
		height: 100%;
		border-radius: 1rem;
	}
	.slide img {
		max-height: 200px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		vertical-align: middle;
		object-fit: cover;
		position: relative;
		z-index: 1;
		border-radius: 1rem;
		box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
	}
	.slide article {
		padding: 1rem;
	}
</style>
