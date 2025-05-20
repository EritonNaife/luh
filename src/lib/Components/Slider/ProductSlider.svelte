<script lang="ts">
	import { onMount } from "svelte";
	import { featuredProducts,type Product } from "$lib/data/products";

  // Reference to the scrollable container element
  let scrollContainer: HTMLElement;
  // Width of a single card + gap (calculated on mount)
  let scrollAmount: number = 0;
  // State to disable/enable buttons at the ends
  let isAtStart = true;
  let isAtEnd = false;


  // Calculate scroll amount based on the first card's width after component mounts
  // Also set initial button states
  onMount(() => {
    // Need a slight delay to ensure layout is fully calculated, especially with dynamic widths
    setTimeout(() => {
        calculateScrollAmount();
        updateButtonStates(); // Initial check
    }, 50); // 50ms delay, adjust if needed

    // Optional: Recalculate on resize if the layout is very fluid
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  });

  function calculateScrollAmount() {
     if (!scrollContainer) return;
     const firstCard = scrollContainer.querySelector('.product-card-item') as HTMLElement; // Use updated class name
     if (firstCard) {
       // Get the computed style to include margin/gap
       const style = window.getComputedStyle(firstCard);
       const cardWidth = firstCard.offsetWidth; // Use offsetWidth for full width including border/padding
       // Get the gap from the container's style if possible, otherwise assume based on class
       const containerStyle = window.getComputedStyle(scrollContainer);
       // Note: Parsing gap reliably can be tricky. Assuming space-x-4 (1rem = 16px)
       const gap = parseFloat(containerStyle.columnGap) || 16; // Use columnGap or fallback
       // Scroll by the width of one card + one gap
       scrollAmount = cardWidth + gap;
       // console.log(`Calculated scroll amount: ${scrollAmount}`);
     }
  }

  // Function to scroll to the previous card (scroll by one card width + gap)
  function scrollPrev() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  // Function to scroll to the next card (scroll by one card width + gap)
  function scrollNext() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  // Function to update button disabled states based on scroll position
  function updateButtonStates() {
      if (!scrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      // Add a small tolerance (e.g., 1px) for floating point inaccuracies
      const tolerance = 1;
      isAtStart = scrollLeft <= tolerance;
      // Check if scrollLeft is at or very near the maximum scroll position
      isAtEnd = scrollLeft >= scrollWidth - clientWidth - tolerance;

      // Log scroll values for debugging
      // console.log(`Scroll Left: ${scrollLeft.toFixed(2)}, Scroll Width: ${scrollWidth.toFixed(2)}, Client Width: ${clientWidth.toFixed(2)}, Is At Start: ${isAtStart}, Is At End: ${isAtEnd}`);
  }

  // Debounce function to limit the rate of execution
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

  // Debounced version of the scroll handler
  const debouncedScrollHandler = debounce(updateButtonStates, 100); // Adjust delay if needed (100-150ms is usually good)

  // Debounced resize handler
  // const handleResize = debounce(() => {
  //   calculateScrollAmount();
  //   updateButtonStates();
  // }, 200);

  // Helper function to format price
  function formatPrice(price: number): string {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
</script>

<div class="flex justify-center">
	<div class="w-100 lg:w-7xl font-sans">
		<div class="relative">
			<div bind:this={scrollContainer} on:scroll={debouncedScrollHandler}  style="-webkit-overflow-scrolling: touch;"
			class="flex overflow-x-auto snap-x scroll-smooth p-4 space-x-4 scrollbar-hide">
			{#each featuredProducts as product}
			<div class="flex-shrink-0 snap-center overflow-hidden flex flex-col w-56 lg:w-75">
			  <img
				src={product.imageUrl}
				alt={product.name}
				class="w-full object-cover h-50 lg:h-80 lg:w-65 lg:h-90"/>
			  <div class="py-4">
				<h3 class="text-[17px] lg:text-xl">{product.name}</h3>
				<p class="text-sm">{product.description}</p> 
				<p class="text-[12px]">{formatPrice(product.price)}</p> 
			  </div>
			</div>
		  {/each}
		</div>

		</div>
	</div>
  </div>
  


<style>
	/* Utility to hide scrollbars */
	.scrollbar-hide::-webkit-scrollbar {
	  display: none; /* Safari and Chrome */
	}
	.scrollbar-hide {
	  -ms-overflow-style: none;  /* IE and Edge */
	  scrollbar-width: none;  /* Firefox */
	}
  </style>
  