<script>
    let isHovering = false;
  
    function showDropdown() {
      isHovering = true;
    }
  
    function hideDropdown() {
      isHovering = false;
    }
  
    const categories = [
      {
        title: 'Cups',
        hrefBase: '/shop/cups',
        items: [
          { name: 'Home', href: '/home' },
          //{ name: 'Earth', href: '/earth' },
          //{ name: 'Mood', href: '/mood' },
          //{ name: 'Gift', href: '/gift' },
        ],
      },
      {
        title: 'Molds',
        hrefBase: '/shop/moldes',
        items: [
          { name: 'Silicone Molds', href: '/silicone' },
          //{ name: 'Pros Acrylic Molds', href: '/pros-acrylic' },
          //{ name: 'Metal Molds', href: '/metal' },
          //{ name: 'Plastic Molds', href: '/plastic' },
        ],
      },
      {
        title: 'Ceramics',
        hrefBase: '/shop/packs',
        items: [
          { name: 'Relaxation Pack', href: '/relaxation' },
          //{ name: 'Focus & Clarity Pack', href: '/focus-clarity' },
          //{ name: 'Romance Pack', href: '/romance' },
        ],
      },
    ];
  </script>
  
  <div
    class="relative"
    on:mouseenter="{showDropdown}"
    on:focusin="{showDropdown}"
    on:focusout="{hideDropdown}"
  
  >
    <a href="/products" class="hover:underline" aria-haspopup="true" aria-expanded="{isHovering}">Collections</a>
  
    {#if isHovering}
      <div
        class="absolute left-0 mt-4 w-full min-w-[600px] bg-white shadow-xl rounded-md p-6 z-10"
        role="dialog"
        aria-labelledby="shop-mega-menu-title"
        on:mouseleave="{hideDropdown}"
      >
        <div class="grid grid-cols-3 gap-x-8 ">
          {#each categories as category (category.title)}
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {category.title}
              </h3>
              <ul class="space-y-2" role="menu" aria-labelledby="{category.title.toLowerCase()}-heading">
                <span id="{category.title.toLowerCase()}-heading" class="sr-only">{category.title}</span>
                {#each category.items as item (item.name)}
                  <li role="none">
                    <a
                      href="{category.hrefBase}{item.href}"
                      class="block text-sm text-gray-600 hover:text-gray-900 hover:underline"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
  