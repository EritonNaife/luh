<script>

    export let disabled = false;
    export let onClick = () => {};
</script>


<button
  class="btn-primary px-8 py-3 rounded-full hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
  on:click={onClick}
  {disabled}
>
  <slot />
</button>