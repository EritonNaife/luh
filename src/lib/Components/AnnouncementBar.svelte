<script lang="ts">
    let announcements = ["Bem-vinda à Luh Bea — velas feitas com carinho e essência 💗","Free shipping from 60€.","10% discount on the first order","Envios para todo o Brasil com rastreamento rápido! 📦"];
</script>

<div class="flex h-10 w-full overflow-hidden text-white  bg-black">
  <div class="animate-marquee flex min-w-full shrink-0 items-center gap-6 py-2 whitespace-nowrap">
    {#each announcements as announcement}
    <p class="flex items-center gap-6 px-2 text-sm font-medium">{announcement}</p>
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