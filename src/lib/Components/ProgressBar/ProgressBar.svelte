<script lang="ts">
    import { onMount } from 'svelte';

    export let current: number = 0;
    export let max: number = 100;
    

    let animatedPecent = 0;
    let percent = max > 0 ? Math.min(100, (current / max) * 100) : 0;

    onMount(() => {
    // Start animation after component is mounted
    requestAnimationFrame(() => {
      animatedPecent = percent;
    });
  });
  </script>


<div class={"w-100 bg-gray-200 rounded-full h-3 overflow-hidden"}>

    <div
      class="h-full bg-red-900 transition-all duration-700 ease-out"
      style="width: {animatedPecent}%"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin="0"
      aria-valuemax={max}
    ></div>
</div>


  