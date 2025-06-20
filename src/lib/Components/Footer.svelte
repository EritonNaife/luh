<script>
    import Icon from "@iconify/svelte";
</script>

<footer class="p-12 bg-[#fff9f9] border-[#f3e0df] border-t-1">
    <div class="container mx-auto">
        <div class="grid center grid-cols-1 md:grid-cols-4 gap-12">
            <!-- Brand Section -->
            <div class="space-y-4 ">
                <h3 class="text-2xl font-bold">LuhBea</h3>
                <p class="">Bring a little bit of light into your life</p>
                <div class="flex space-x-4">
                    <a href="https://www.facebook.com/profile.php?id=61550866414034&locale=pt_PT">
                        <Icon icon="logos:facebook" width="24" height="24" />
                    </a>
                    <a href="https://www.tiktok.com/@luhbeacandles?_t=ZG-8wV0kOxcdQu&_r=1" class="text-black">
                        <Icon icon="logos:tiktok-icon" width="24" height="24" />
                    </a>
                    <a href="https://www.instagram.com/luhbeacandles?igsh=dDR5cXlhOHpobzQ2" class="text-black">
                        <Icon icon="skill-icons:instagram" width="25" height="25" />
                    </a>
                    
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <ul class="space-y-2 mt-10">
                    
                    <li><a href="/about" class=" transition-colors">About Us</a></li>
                    <li><a href="/contacts" class="transition-colors">Contact</a></li>
                </ul>
            </div>

            <!-- Customer Service -->
            <div>

                <ul class="space-y-2 mt-10">
                    <li><a href="" class="transition-colors">FAQ</a></li>
                    <li><a href="#" class="transition-colors">Privacy Policy</a></li>
                    <li><a href="#" class="transition-colors">Terms of Service</a></li>
                </ul>
            </div>

            
            <!-- Newsletter -->
            <div>
                <h4 class="text-lg font-semibold mb-4">Stay Updated</h4>
                <p class="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                <form class="space-y-2">
                    <input type="email" placeholder="Your email address" class="w-full border-2 border-primary-500/20 rounded-lg focus:outline-none focus:border-primary-500 text-dark ">
                    <button type="submit" class="bg-black text-white w-full py-2 rounded-lg hover:bg-white hover:text-black transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t mt-12 pt-8 text-center">
            <p>&copy; 2025 LuhBea. All rights reserved.</p>
        </div>
    </div>
</footer>

