<script lang="ts">
    let announcements = ["welcome","Worldwide shipping","Free shipping from 60€ to Portugal continental"];
</script>

<div class="flex w-full overflow-hidden bg-[#fae0df] text-[#2F2F2F] ">
  <div class="animate-marquee flex min-w-full shrink-0 items-center gap-10 lg:gap-60 py-[5px] whitespace-nowrap">
    {#each announcements as announcement}
      <p class="flex items-center gap-6 px-2 text-[10px] uppercase">{announcement}</p>
    {/each}
  </div>
</div>


<style>

@keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 50s linear infinite;
}
</style>