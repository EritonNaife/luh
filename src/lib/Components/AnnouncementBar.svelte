<script lang="ts">
    let announcements = ["Welcome to 🔥  Luh Bea ","Worldwide shipping","Free shipping from 60€"];
</script>

<div class="flex w-full overflow-hidden bg-white text-[#2F2F2F] ">
  <div class="animate-marquee flex min-w-full shrink-0 items-center gap-5 py-[2px] whitespace-nowrap">
    {#each announcements as announcement}
      <p class="flex items-center gap-6 px-2 text-[11px]">{announcement}</p>
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