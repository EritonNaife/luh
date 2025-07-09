<!-- src/lib/SearchBar.svelte -->
<script>
    import Icon  from '@iconify/svelte'; // Importing Icon component from Iconify
    let focused = false; // Variable (not strictly needed here but could be useful if you want to track focus state)
  </script>
  
  <!-- Outer container to center the input -->
  <div class="relative w-full flex justify-center text-[#737373]">
  
    <!-- The search input -->
    <input
      type="text"
      placeholder="Try searching for..."
      class="
        transition-all duration-300 ease-in-out  <!-- Makes width and style changes smooth -->
        bg-transparent  <!-- No background color -->
                                                  <!-- Placeholder and text are white -->
        border-0 border-b-2 
        focus:ring-0 focus:border-black focus:outline-none  <!-- Remove default focus styles, keep bottom border white -->
        py-2 pr-10  <!-- Vertical padding and extra right padding for the icon space -->
        w-90 focus:w-120  <!-- Initial width is small (w-40), expands to larger width (w-90) on focus -->
      "
      on:focus={() => focused = true}  
      on:blur={() => focused = false}
    />
  
    <!-- The search icon -->
    <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
      <!--
        absolute → positions it inside the input relative to parent
        right-3 → slightly inside from the right edge
        top-1/2 transform -translate-y-1/2 → perfectly centers it vertically
      -->
      <Icon icon="mdi:magnify" class="w-6 h-6" /> <!-- White search (magnifying glass) icon -->
    </div>
  
  </div>
  
  
  <style>

  </style>