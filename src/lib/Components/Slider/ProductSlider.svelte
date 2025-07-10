<script lang="ts">
  import { onMount } from "svelte";
  import { featuredCups} from "$lib/data/products";
  import SliderCard from "../Cards/SliderCard.svelte";
  import ProductCard from "../Cards/ProductCard.svelte";

  // Reference to the scrollable container element
  let scrollContainer: HTMLElement;
  // Width of a single card + gap (calculated on mount)
  let scrollAmount: number = 0;
  // State to disable/enable buttons at the ends
  let isAtStart = true;
  let isAtEnd = false;

  // Calculate scroll amount based on the first card's width after component mounts
  onMount(() => {
    setTimeout(() => {
      calculateScrollAmount();
      updateButtonStates();
    }, 100); // Increased delay slightly for better reliability
  });

  function calculateScrollAmount() {
    if (!scrollContainer) return;
    
    // Look for the first product card div (direct child of the scroll container)
    const firstCard = scrollContainer.querySelector('div:first-child') as HTMLElement;
    
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      // Get the gap from the container's computed style
      const containerStyle = window.getComputedStyle(scrollContainer);
      const gap = parseFloat(containerStyle.columnGap) || 16; // Fallback to 16px for space-x-4
      
      scrollAmount = cardWidth + gap;
      console.log(`Calculated scroll amount: ${scrollAmount}px`); // Helpful for debugging
    }
  }

  // Function to scroll to the previous card
  function scrollPrev() {
    if (scrollContainer && scrollAmount > 0) {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      // Update button states after scroll animation
      setTimeout(updateButtonStates, 300);
    }
  }

  // Function to scroll to the next card
  function scrollNext() {
    if (scrollContainer && scrollAmount > 0) {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      // Update button states after scroll animation
      setTimeout(updateButtonStates, 300);
    }
  }

  // Function to update button disabled states based on scroll position
  function updateButtonStates() {
    if (!scrollContainer) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    const tolerance = 2; // Slightly increased tolerance
    
    isAtStart = scrollLeft <= tolerance;
    isAtEnd = scrollLeft >= scrollWidth - clientWidth - tolerance;
  }

  // Debounce function
  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: number | undefined;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }

  const debouncedScrollHandler = debounce(updateButtonStates, 100);

  
</script>

<div class="flex justify-center">
  <div class="w-[80vw] font-sans">
    <div class="relative">
      <div 
        bind:this={scrollContainer} 
        on:scroll={debouncedScrollHandler}  
        style="-webkit-overflow-scrolling: touch;"
        class="flex overflow-x-auto snap-x scroll-smooth p-4 space-x-4 scrollbar-hide"
      >
        {#each featuredCups as product}
          <SliderCard {product} sectionCollections={true} />
        {/each}
      </div>
      
      <div class="absolute inset-y-0 left-0 flex items-center -translate-x-4 md:-translate-x-8">
        <button
          on:click={scrollPrev}
          disabled={isAtStart}
          aria-label="Previous Card"
          class="bg-gray-700 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      
      <div class="absolute inset-y-0 right-0 flex items-center translate-x-4 md:translate-x-8">
        <button
          on:click={scrollNext}
          disabled={isAtEnd}
          aria-label="Next Card"
          class="bg-gray-700 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
