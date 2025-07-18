<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import CurrencyDropdown from './Dropdowns/CurrencyDropdown.svelte';
  // import SearchBar from './SearchBar.svelte'; // Assuming SearchBar is not used if input is directly in header
  import AnnouncementBar from './AnnouncementBar.svelte';
  import MobileNavMenuButton from './MobileNavMenuButton.svelte';
  import MobileNavMenu from './MobileNavMenu.svelte';
  import ShopDropdown from '$lib/Components/Dropdowns/ShopDropdown.svelte';
  import SlidingRegister from './SlidingRegister/SlidingRegister.svelte';
  import SlidingCart from './SlidingMenus/SlidingCart.svelte';
  import { page } from '$app/stores'; // Corrected import

  // Define props with TypeScript types
  // These props define the SCROLLED state colors.
  // The user wants "text-black" and "bg-[#fae0df]" when scrolled,
  // which are currently hardcoded. You could use these props if you prefer.
  // export let scrolledBgColor: string = 'bg-[#fae0df]'; // Example: using the specific pink from your scrolled state
  // export let scrolledTextColorClass: string = 'text-black'; // Example: using black for scrolled text

  let scrollY: number = 0;

  let isMobileNavOpen = false;
  let isScrolled: boolean = false;
  let isHovering = false;
  let isSlidingRegisterOpen: boolean = false;
  let isSlidingCartOpen: boolean = false;
  let focused = false;

  // Threshold for when to change the header color (in pixels)
  const SCROLL_THRESHOLD: number = 10; // Reduced for easier testing, you had 1000

  // --- Route-based styling ---
  let currentPath: string;
  $: currentPath = $page.url.pathname;

  // Define base classes based on the route (non-scrolled state)
  $: applyTransparentStyle = currentPath === '/' || currentPath === '/shop/collections/calm' || currentPath === '/shop/collections/earth' || currentPath === '/shop/collections/gift' || currentPath === '/shop/collections/mood' || currentPath === '/discounts';


  // For the header background and text
  $: baseBgClass = applyTransparentStyle ? 'bg-transparent' : 'bg-[#fae0df]'; // Or your specific pink e.g., 'bg-[#FADADD]'
  $: baseTextClass = applyTransparentStyle ? 'text-white' : 'text-[#333333]';

  // For the search input placeholder and border (non-scrolled state)
  $: nonScrolledInputPlaceholderClass = applyTransparentStyle ? 'placeholder-white' : 'placeholder-black';
  $: nonScrolledInputBorderClass = applyTransparentStyle ? 'border-white' : 'border-black';

  // --- Scroll handling ---
  function handleScroll(): void {
    scrollY = window.pageYOffset;
    isScrolled = scrollY > SCROLL_THRESHOLD;
  }

   function showDropdown() {
      isHovering = true;
    }
  
    function hideDropdown() {
      isHovering = false;
    }

  export let onClose = () => {}; // This prop seems unused in the provided snippet, ensure it's needed.

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<div class="fixed top-0 left-0 w-full z-1">
  <AnnouncementBar />
</div>

<header class="fixed top-5 left-0 w-full z-50 transition-all duration-400 ease-in-out flex flex-col {isScrolled
    ? 'text-[#333333] bg-[#fae0df]' 
    : `${baseTextClass} ${baseBgClass}`}"
>
  <div class="p-4 flex justify-between items-center lg:px-10">

    <div class="flex items-center lg:hidden">
      <MobileNavMenuButton isOpen={isMobileNavOpen} toggle={() => (isMobileNavOpen = !isMobileNavOpen)} />
      <a href="/wishlist"> <Icon icon="ph:heart-light" class="text-2xl" /></a>
    </div>

    <a href="/" class="flex justify-center items-center">
      <img src="/LuhBea Logotipo.svg" alt="" class="absolute size-40 md:size-55 lg:size-55 lg:left-[1px]">
    </a> 

  
    <nav class="uppercase text-[12px] hidden lg:flex space-x-6 items-center">
      <ShopDropdown/>
    </nav>

    <div class="hidden relative lg:flex items-center ">
      
      <div class="relative flex justify-center text-[#333333]">
        <input
          type="text"
          placeholder="Try searching for..."
          class="
            transition-all duration-300 ease-in-out
            bg-transparent
            border-0 border-b-1
            focus:ring-0 focus:outline-none
            placeholder:text-[12px] 
            h-10
            w-80 focus:w-120
            {isScrolled ? 'placeholder-black border-[#333333] focus:border-[#333333]' : `${nonScrolledInputPlaceholderClass} ${nonScrolledInputBorderClass} focus:${nonScrolledInputBorderClass}`}
          "
          on:focus={() => (focused = true)}
          on:blur={() => (focused = false)}
        />

        <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Icon icon="mdi:magnify" class="size-[18px] {isScrolled ? 'text-black' : baseTextClass}" />
        </div>
      </div>

    </div>

    <div class="flex items-center gap-1 lg:gap-4 ">  
     
      
      <a href="#" on:click={() => (isSlidingRegisterOpen = true)}>
        <Icon icon="ph:user-light" class="size-[18px]" />
      </a>

      <a href="/wishlist"> <Icon icon="ph:heart-light" class="size-[18px] hidden lg:flex" /></a>

      <button class="" on:click={() => (isSlidingCartOpen = true)}>
        <Icon icon="ph:shopping-cart-simple-light" class="size-[18px]" />
      </button>
      
    </div>

  </div>

  <!--
    <div class="relative flex flex-col p-2 w-full lg:hidden {isScrolled ? 'text-black bg-white' : `${baseTextClass} ${baseBgClass} `}">

    <div class="flex justify-end ">
      <Icon icon="mdi:magnify" class="size-7"/>
    </div>
  </div>
  -->
 
  <input type="text" placeholder="Try searching for..." class=" transition-all duration-300 ease-in-out
                                                                flex lg:hidden
                                                                border-0 border-b-2
                                                                focus:ring-0 focus:outline-none
                                                                py-2 pr-10
                                                                w-full
    {isScrolled ? 'placeholder-black border-white' : `${nonScrolledInputPlaceholderClass} ${nonScrolledInputBorderClass} ${" bg-transparent" }` }"/>
   

    <div class="absolute left-[92%] top-[69%] flex lg:hidden sm:left-[94%] md:left-[96%]">
      <Icon icon="mdi:magnify" class="size-7 {isScrolled ? 'text-[#737373]' : baseTextClass}" />
    </div>
</header>

{#if isMobileNavOpen}
  <MobileNavMenu on:close={() => (isMobileNavOpen = false)} />
{/if}

{#if isSlidingRegisterOpen}
  <SlidingRegister isOpen={isSlidingRegisterOpen} close={() => (isSlidingRegisterOpen = false)} />
{/if}

{#if isSlidingCartOpen}
  <SlidingCart isMenuOpen={isSlidingCartOpen} closeMenu={() => (isSlidingCartOpen = false)} />
{/if}

<style global>
  /* Prevent body scroll when menu is open */
  body:has(.mobile-nav-open) {
    overflow: hidden;
  }
  /* You might want to define h1 if it's not a utility class */

</style>