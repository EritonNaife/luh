<script lang="ts">
  import { onMount } from 'svelte';
  
  type Category = 'cups' | 'molds' | 'ceramics';
  
  interface MenuItem {
    href: string;
    label: string;
  }
  
  interface MenuItems {
    [key: string]: MenuItem[];
  }
  
  let activeDropdown: Category | null = null;
  let navRef: HTMLElement;
  
  // Dropdown menu items for each category
  const menuItems: MenuItems = {
    cups: [
      { href: '/shop/cups/home', label: 'Home Collection' },
    ],
    molds: [
      { href: '/shop/molds/silicone', label: 'Silicone Molds' },
      { href: '/shop/molds/christmas', label: 'Christmas Molds' },
      { href: '/shop/molds/easter', label: 'Easter Molds' },
      { href: '/shop/molds/summer', label: 'Summer Molds' },
      { href: '/shop/molds/elegant', label: 'Elegant Molds' },
      { href: '/shop/molds/valentines', label: 'Valentine\'s Molds' },
      { href: '/shop/molds/other', label: 'Other Molds' }

    ],
    ceramics: [
      { href: '/shop/ceramics/', label: 'cups' },
      { href: '/shop/ceramics/plates', label: 'Candle Bases' },
    ]
  };
  
  function showDropdown(category: Category): void {
    activeDropdown = category;
  }
  
  function hideDropdown(): void {
    activeDropdown = null;
  }
  
  function handleKeydown(event: KeyboardEvent, category: Category): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activeDropdown = activeDropdown === category ? null : category;
    } else if (event.key === 'Escape') {
      activeDropdown = null;
    }
  }
  
  // Close dropdown when clicking outside
  onMount(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (navRef && !navRef.contains(event.target as Node)) {
        activeDropdown = null;
      }
    }
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<nav bind:this={navRef} class="uppercase text-[12px] hidden lg:flex space-x-6 items-center relative">
  <!-- Cups Dropdown -->
  <div class="relative">
    <button
      on:mouseenter={() => showDropdown('cups')}
      on:focusin={() => showDropdown('cups')}
      on:focusout={hideDropdown}
      on:keydown={(e) => handleKeydown(e, 'cups')}
      class="hover:underline focus:outline-none focus:underline flex items-center gap-1"
      aria-haspopup="true"
      aria-expanded={activeDropdown === 'cups'}
    >
      Cups
      
    </button>
    
    {#if activeDropdown === 'cups'}
      <div
        on:mouseenter={() => showDropdown('cups')}
        on:mouseleave={hideDropdown}
        class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 animate-in fade-in-0 slide-in-from-top-2 duration-200"
      >
        {#each menuItems.cups as item}
          <a
            href={item.href}
            class="block px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Molds Dropdown -->
  <div class="relative">
    <button
      on:mouseenter={() => showDropdown('molds')}
      on:focusin={() => showDropdown('molds')}
      on:focusout={hideDropdown}
      on:keydown={(e) => handleKeydown(e, 'molds')}
      class="hover:underline focus:outline-none focus:underline flex items-center gap-1"
      aria-haspopup="true"
      aria-expanded={activeDropdown === 'molds'}
    >
      Molds
      
    </button>
    
    {#if activeDropdown === 'molds'}
      <div
        on:mouseenter={() => showDropdown('molds')}
        on:mouseleave={hideDropdown}
        class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 animate-in fade-in-0 slide-in-from-top-2 duration-200"
      >
        {#each menuItems.molds as item}
          <a
            href={item.href}
            class="block px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Ceramics Dropdown -->
  <div class="relative">
    <button
      on:mouseenter={() => showDropdown('ceramics')}
      on:focusin={() => showDropdown('ceramics')}
      on:focusout={hideDropdown}
      on:keydown={(e) => handleKeydown(e, 'ceramics')}
      class="hover:underline focus:outline-none focus:underline flex items-center gap-1"
      aria-haspopup="true"
      aria-expanded={activeDropdown === 'ceramics'}
    >
      Ceramics
    </button>
    
    {#if activeDropdown === 'ceramics'}
      <div
        on:mouseenter={() => showDropdown('ceramics')}
        on:mouseleave={hideDropdown}
        class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 animate-in fade-in-0 slide-in-from-top-2 duration-200"
      >
        {#each menuItems.ceramics as item}
          <a
            href={item.href}
            class="block px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
          >
            {item.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</nav>