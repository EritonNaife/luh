<script lang="ts">
    import { onMount } from 'svelte';

    export let current: number = 0;
    export let max: number = 100;
    export let width: string = 'w-full'; 
    export let showInternalRedeemButton: boolean = true;

    let animatedPecent = 0;
    let percent = max > 0 ? Math.min(100, (current / max) * 100) : 0;

    onMount(() => {
    // Start animation after component is mounted
    requestAnimationFrame(() => {
      animatedPecent = percent;
    });
  });
  </script>


<div class="${width} bg-gray-200 rounded-full h-3 overflow-hidden">

    <div
      class="h-full bg-red-900 transition-all duration-700 ease-out"
      style="width: {animatedPecent}%"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin="0"
      aria-valuemax={max}
    ></div>
</div>

<div class="text-sm mt-1 text-center">
    {current} / {max} points
</div>

{#if showInternalRedeemButton && max > 0 && current >= max}
    <button class="p-1 border-1 rounded-xl">
      Redeem Now
    </button>
  {/if}
  
  