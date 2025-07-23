<script lang="ts">
    import Icon from "@iconify/svelte";
    import { fly } from 'svelte/transition'; // Import fly transition

</script>

<main class="h-screen mt-50 mb-50 mx-auto w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] text-[#6B6B6B]">

    <div class="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden md:flex" >

        <div
            class="md:w-[60%] p-8 md:p-12"
            in:fly="{{ x: -200, duration: 900, delay: 200 }}"
            out:fly="{{ x: -200, duration: 500 }}"
        >
            
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
            <p class="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below.</p>

            <form action="" class="space-y-6">
             
                <div class="flex flex-col gap-2">
                    <label for="fullName" class="text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="fullName" placeholder="Marion Jamassim" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                </div>

               <div class="w-full flex flex-col gap-6 md:flex-row md:gap-4">

                    <div class="flex flex-col gap-2 md:w-[50%]">
                        <label for="email" class="text-sm font-medium text-gray-700">E-mail</label>
                        <input type="email" id="email" placeholder="you@example.com" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                    </div>

                    <div class="flex flex-col gap-2 md:w-[50%]">
                        <label for="phone" class="text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" placeholder="(351) 932 456 789" class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                    </div>

               </div>

                <div class="flex flex-col gap-2">
                    <label for="message" class="text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows="5" placeholder="Your message here..." class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"></textarea>
                </div>

                <button type="submit" class="p-4 bg-black text-white w-full rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-300">
                    Send Message
                </button>
            </form>

        </div>

       <div
            class="md:w-[40%] bg-gray-50 p-8 md:p-12 flex flex-col justify-center"
            in:fly="{{ x: 200, duration: 800, delay: 400 }}"
            out:fly="{{ x: 200, duration: 500 }}"
       >

            <h3 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>

            <div class="space-y-5">

                <div class="flex items-start gap-4">

                    <div class="flex-shrink-0">
                        <svg class="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>

                    <div>
                        <p class="font-semibold text-gray-800">Email</p>
                        <p class="text-gray-600">luhbeacandles@gmail.com</p>
                    </div>

                </div>

            </div>
       </div>

    </div>
</main>