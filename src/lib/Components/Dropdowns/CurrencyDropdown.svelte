<script lang="ts">
    import { selectedCurrency, currencies, type Currency } from '$lib/stores/currency';
    import Icon from '@iconify/svelte';
    
    let isOpen = false;
    let dropdownRef: HTMLDivElement;
    
    function toggleDropdown() {
      isOpen = !isOpen;
    }
    
    function selectCurrency(currency: Currency) {
      selectedCurrency.set(currency);
      isOpen = false;
    }
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        isOpen = false;
      }
    }
    
    // Close dropdown when clicking outside
    $: if (typeof window !== 'undefined') {
      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
    }
  </script>
  
  <div class="relative" bind:this={dropdownRef}>
    <button
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-black/10 transition-colors duration-200"
      on:click={toggleDropdown}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <span>{$selectedCurrency.symbol}</span>
      <span class="hidden sm:inline">{$selectedCurrency.code}</span>
      <Icon 
        icon="mdi:chevron-down" 
        class="w-4 h-4 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
      />
    </button>
    
    {#if isOpen}
      <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
        <div class="py-1">
          {#each currencies as currency}
            <button
              class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors duration-150
                     {$selectedCurrency.code === currency.code ? 'bg-gray-50 font-medium' : ''}"
              on:click={() => selectCurrency(currency)}
            >
              <div class="flex items-center gap-3">
                <span class="font-medium">{currency.symbol}</span>
                <div class="flex flex-col">
                  <span class="text-gray-900">{currency.code}</span>
                  <span class="text-xs text-gray-500">{currency.name}</span>
                </div>
              </div>
              {#if $selectedCurrency.code === currency.code}
                <Icon icon="mdi:check" class="w-4 h-4 text-green-600" />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  