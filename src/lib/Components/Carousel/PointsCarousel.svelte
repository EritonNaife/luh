<script lang="ts">
    import { pointsCardData } from "$lib/data/pointsCardData";
    import Icon from "@iconify/svelte";

</script>

<div class="flex justify-center">
    <div class="w-100">
        <div class="flex overflow-x-auto snap-x scroll-smooth p-4 space-x-4 scrollbar-hide">
            {#each pointsCardData as card}
                <div class="flex-shrink-0 snap-center overflow-hidden flex flex-col justify-center p-4 w-70 h-80 gap-5 rounded-xl shadow-xl">
                    <Icon icon={card.icon} class="w-8 h-8 lg:w-10 lg:h-10" />
                    <h3  class="text-lg lg:text-xl">{card.title}</h3>
                    <p class="text-center">{card.description}</p>
                    <div class="w-full border-t-1"></div>
                    <p class="text-center text-sm lg:text-sm">{card.annotation}</p>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  
    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  </style>