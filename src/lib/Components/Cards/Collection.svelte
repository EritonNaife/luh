<script>
    export let link;
    export let caption;
    export let url;
</script>



<!--

<a href={link} class="relative w-60 h-81 group cursor-pointer lg:w-100 h-60">

    <div class="aspect-[3/4] w-full overflow-hidden">
        <img src={url} alt="" class="bg-black w-full h-full object-cover transition-trasnform duration-700 group-hover:scale-103">
    </div>

    <div class="flex justify-center items-center">
        <p class="absolute w-[90%] bottom-[4%] text-center text-white text-md bg-black/40 backdrop-blur-xs lg:text-lg lg:-bottom-[60%] lg:h-10 lg:flex justify-center items-center">{caption}</p>
    </div>
    
</a>

-->

<a href={link} class="relative w-[48vw] md:w-[48vw] lg:w-[24vw] group cursor-pointer flex flex-col items-center">

    <header class="aspect-[4/5]  w-full overflow-hidden">
        <img src={url} alt={caption} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
    </header>

    <footer class="absolute w-[90%] bottom-[1vh] bg-black/40 backdrop-blur-xs text-white lg:bottom-4 transition-transform duration-700 group-hover:scale-103">
        <h3 class="text-lg text-center transition-transform duration-700 group-hover:scale-103">{caption}</h3>
    </footer>
</a>