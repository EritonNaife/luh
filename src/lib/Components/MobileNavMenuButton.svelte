<script lang="ts">
    import Icon from '@iconify/svelte';
	  import { onMount } from 'svelte';
    import { page } from '$app/stores'; // Corrected import
    export let isOpen = false;
    let isScrolled: boolean = false;
    export let toggle: () => void;

    // Threshold for when to change the header color (in pixels)
  const SCROLL_THRESHOLD: number = 1000;

  let currentPath: string;
  $: currentPath = $page.url.pathname;
  $: applyTransparentStyle = currentPath === '/' || currentPath === '/shop/collections/calm' || currentPath === '/shop/collections/earth' || currentPath === '/shop/collections/gift' || currentPath === '/shop/collections/mood' || currentPath === '/discounts';
  $: baseTextClass = applyTransparentStyle ? 'text-white' : 'text-black';

  // Update scrollY value when page is scrolled
  function handleScroll(): void {
    scrollY = window.pageYOffset;
    isScrolled = scrollY > SCROLL_THRESHOLD;
  }


  export let onClose = () => {};
  
  onMount(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Clean up event listener when component is destroyed
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<button
    on:click={toggle}
    class="md:hidden p-2 rounded-lg"
    aria-label={isOpen ? "Close menu" : "Open menu"}
>
    <Icon 
        icon={isOpen ? "material-symbols:close" : "material-symbols:menu"} 
        class="h-6 w-6 {isScrolled ? "text-black" : baseTextClass} " 
    />
</button>