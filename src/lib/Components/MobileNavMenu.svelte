<script lang="ts">
    import Icon from '@iconify/svelte';
    import { createEventDispatcher } from 'svelte';
    
    // Import the SearchBar component
    import SearchBar from './SearchBar.svelte';
    
    const dispatch = createEventDispatcher();
    let openItem: string | null = null;
    let cartCount = 3; // Example cart count
    
    // Toggle accordion items
    const toggleItem = (item: string) => {
        openItem = openItem === item ? null : item;
    };
    
    // Handle menu close
    function handleClose() {
        dispatch('close');
    }
  </script>
  
  <!-- Backdrop -->
  <div class="fixed inset-0 z-50 bg-[#8D3C42]/50 backdrop-blur-sm transition-opacity" on:click={handleClose} />
  
  <!-- Menu Container -->
  <div class="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-white shadow-xl overflow-y-auto">
    <div class="flex h-full flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[#F9F5F3] px-4 py-4">
            <span class="text-lg font-[PlayfairDisplay] font-semibold text-[#8D3C42]">Candle Menu</span>
            <button 
                on:click={handleClose} 
                class="rounded-full p-2 hover:bg-[#F9F5F3] transition-colors"
            >
                <Icon icon="material-symbols:close" class="h-6 w-6 text-[#8D3C42]" />
                <span class="sr-only">Close</span>
            </button>
        </div>
  
        <!-- Search bar area -->
        <div class="px-4 py-3">
            <SearchBar />
        </div>
  
        <!-- User Account & Cart Row -->
        <div class="flex justify-between items-center px-4 py-3 bg-[#F9F5F3]/50">
            <a href="/register" class="flex items-center text-[#8D3C42] font-medium">
                <Icon icon="mdi:account" class="h-5 w-5 mr-2" />
                My Account
            </a>
            <a href="/cart" class="flex items-center text-[#8D3C42] font-medium relative">
                <Icon icon="mdi:shopping-outline" class="h-5 w-5 mr-1" />
                {#if cartCount > 0}
                    <span class="absolute -top-3 -right-3 bg-[#D4A373] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
                {/if}
            </a>
        </div>
  
        <!-- Accordion Menu -->
        <div class="flex-1 px-4 py-6">

            <!-- Shop By Fragrance section
            
            
             <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('fragrance')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Shop By Fragrance</span>
                    <Icon
                        icon={openItem === 'fragrance' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'fragrance'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/fragrances" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">All Scents</a>
                        <a href="/fragrances/floral" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Floral</a>
                        <a href="/fragrances/woody" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Woody</a>
                        <a href="/fragrances/citrus" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Citrus</a>
                        <a href="/fragrances/spicy" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Spicy</a>
                        <a href="/fragrances/sweet" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Sweet</a>
                    </div>
                {/if}
            </div>
            -->


            <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('Shop')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Shop</span>
                    <Icon
                        icon={openItem === 'Shop' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'Shop'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/fragrances" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Featured Collection</a>
                        <a href="/fragrances/floral" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Moldes</a>
                        <a href="/fragrances/woody" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Packs</a>
                    </div>
                {/if}
            </div>
  
            <!-- Shop By Collection 
            
             <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('collection')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Shop By Collection</span>
                    <Icon
                        icon={openItem === 'collection' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'collection'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/collections" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">All Collections</a>
                        <a href="/collections/seasonal" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Seasonal</a>
                        <a href="/collections/signature" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Signature</a>
                        <a href="/collections/limited" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Limited Edition</a>
                        <a href="/collections/gift-sets" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Gift Sets</a>
                    </div>
                {/if}
            </div>
            
            -->
            
            <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('rewards')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Rewards</span>
                    <Icon
                        icon={openItem === 'rewards' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'rewards'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/collections" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">My Points</a>
                        <a href="/collections/seasonal" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Redeem with Points</a>
                    </div>
                {/if}
            </div>
  
            <!-- Shop By Product Type 
            
             <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('product')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Shop By Product</span>
                    <Icon
                        icon={openItem === 'product' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'product'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/products" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">All Products</a>
                        <a href="/products/jar-candles" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Jar Candles</a>
                        <a href="/products/pillar-candles" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Pillar Candles</a>
                        <a href="/products/tea-lights" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Tea Lights</a>
                        <a href="/products/wax-melts" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Wax Melts</a>
                        <a href="/products/diffusers" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42]">Reed Diffusers</a>
                    </div>
                {/if}
            </div>
            
            
            -->
  
            <!-- Recently Viewed -->
            <div class="border-b border-[#F9F5F3]">
                <button
                    on:click={() => toggleItem('recent')}
                    class="flex w-full items-center justify-between py-4 text-base font-medium text-[#8D3C42]"
                >
                    <span>Recently Viewed</span>
                    <Icon
                        icon={openItem === 'recent' ? 'material-symbols:expand-less' : 'material-symbols:expand-more'}
                        class="h-6 w-6 text-[#D4A373]"
                    />
                </button>
                {#if openItem === 'recent'}
                    <div class="grid gap-3 pl-1 pb-4">
                        <a href="/products/warm-vanilla" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42] flex items-center">
                            <div class="w-10 h-10 bg-[#F9F5F3] rounded mr-2"></div>
                            Warm Vanilla Jar
                        </a>
                        <a href="/products/winter-pine" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42] flex items-center">
                            <div class="w-10 h-10 bg-[#F9F5F3] rounded mr-2"></div>
                            Winter Pine Candle
                        </a>
                        <a href="/products/lavender-dreams" class="text-sm text-[#5A5A5A] hover:text-[#8D3C42] flex items-center">
                            <div class="w-10 h-10 bg-[#F9F5F3] rounded mr-2"></div>
                            Lavender Dreams Diffuser
                        </a>
                    </div>
                {/if}
            </div>
  
            <!-- Additional Links -->
            <div class="mt-6 space-y-4 border-t border-[#F9F5F3] pt-6">
                <a href="/sale" class="flex items-center justify-between py-2 text-base font-medium text-[#8D3C42] hover:bg-[#F9F5F3] px-2 rounded-lg nav-link">
                    Sale <Icon icon="material-symbols:chevron-right" class="h-5 w-5 text-[#D4A373]" />
                </a>
                <a href="/about" class="flex items-center justify-between py-2 text-base font-medium text-[#8D3C42] hover:bg-[#F9F5F3] px-2 rounded-lg nav-link">
                    About Us <Icon icon="material-symbols:chevron-right" class="h-5 w-5 text-[#D4A373]" />
                </a>
                <a href="/contact" class="flex items-center justify-between py-2 text-base font-medium text-[#8D3C42] hover:bg-[#F9F5F3] px-2 rounded-lg nav-link">
                    Contact <Icon icon="material-symbols:chevron-right" class="h-5 w-5 text-[#D4A373]" />
                </a>
            </div>
        </div>
    </div>
  </div>
  
  <style global>
    /* Animation for menu entrance */
    @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    
    div.fixed.inset-y-0.left-0 {
        animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link:hover {
        color: #8D3C42; /* Your brand color */
    }
  </style>