<script lang="ts">
  import { selectedCurrency, currencies, exchangeRates, updateExchangeRates, type Currency } from '$lib/stores/currency';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  
  let isOpen = false;
  let dropdownRef: HTMLDivElement;
  let isUpdatingRates = false;
  let lastUpdateTime: string = '';
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectCurrency(currency: Currency) {
    // Update the currency with current exchange rate
    const updatedCurrency = {
      ...currency,
      rate: $exchangeRates[currency.code] || currency.rate
    };
    selectedCurrency.set(updatedCurrency);
    isOpen = false;
  }
  
  async function refreshRates() {
    isUpdatingRates = true;
    await updateExchangeRates();
    isUpdatingRates = false;
    updateLastUpdateTime();
  }
  
  function updateLastUpdateTime() {
    const now = new Date();
    lastUpdateTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      isOpen = false;
    }
  }
  
  onMount(() => {
    updateLastUpdateTime();
  });
  
  // Close dropdown when clicking outside
  $: if (typeof window !== 'undefined') {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }
  
  // Clean up event listener on component destroy
  import { onDestroy } from 'svelte';
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<div class="relative" bind:this={dropdownRef}>
  <button
    class="flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-md hover:bg-black/10 transition-colors duration-200"
    on:click={toggleDropdown}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    <span class="font-semibold">{$selectedCurrency.symbol}</span>
    <span class="hidden sm:inline text-xs">{$selectedCurrency.code}</span>
    <Icon 
      icon="mdi:chevron-down" 
      class="w-3 h-3 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
    />
  </button>
  
  {#if isOpen}
    <div class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
      <!-- Header with refresh button -->
      <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <span class="text-xs font-medium text-gray-600">Currency</span>
        <button
          on:click={refreshRates}
          disabled={isUpdatingRates}
          class="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
          title="Refresh exchange rates"
        >
          <Icon 
            icon="mdi:refresh" 
            class="w-3 h-3 {isUpdatingRates ? 'animate-spin' : ''}" 
          />
          {isUpdatingRates ? 'Updating...' : 'Refresh'}
        </button>
      </div>
      
      <div class="py-1 max-h-48 overflow-y-auto">
        {#each currencies as currency}
          {@const currentRate = $exchangeRates[currency.code] || currency.rate}
          <button
            class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors duration-150
                   {$selectedCurrency.code === currency.code ? 'bg-gray-50 font-medium' : ''}"
            on:click={() => selectCurrency(currency)}
          >
            <div class="flex items-center gap-3">
              <span class="font-medium text-gray-700">{currency.symbol}</span>
              <div class="flex flex-col">
                <span class="text-gray-900 font-medium">{currency.code}</span>
                <span class="text-xs text-gray-500">{currency.name}</span>
                {#if currency.code !== 'EUR'}
                  <span class="text-xs text-gray-400">
                    1 EUR = {currentRate.toFixed(4)} {currency.code}
                  </span>
                {/if}
              </div>
            </div>
            {#if $selectedCurrency.code === currency.code}
              <Icon icon="mdi:check" class="w-4 h-4 text-green-600" />
            {/if}
          </button>
        {/each}
      </div>
      
      <!-- Footer with last update time -->
      {#if lastUpdateTime}
        <div class="px-4 py-2 border-t border-gray-100">
          <span class="text-xs text-gray-500">
            Last updated: {lastUpdateTime}
          </span>
        </div>
      {/if}
    </div>
  {/if}
</div>
