<script lang="ts">
    import Icon from '@iconify/svelte';
    import { cubicInOut } from 'svelte/easing';
    import { slide, fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    export let isOpen = false;
    export let close: () => void = () => {};

    let username = '';
    let password = '';
    let rememberMe = false;
    let showPassword = false;
    let isLoading = false;
    let errors: { username?: string; password?: string } = {};

    // Focus management
    let usernameInput: HTMLInputElement;
    let modalElement: HTMLDivElement;

    $: if (isOpen && usernameInput) {
        setTimeout(() => usernameInput.focus(), 100);
    }

    // Close on escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' && isOpen) {
            close();
        }
    }

    // Prevent background scroll when modal is open
    $: if (typeof document !== 'undefined') {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Form validation
    function validateForm() {
        errors = {};
        
        if (!username.trim()) {
            errors.username = 'Username is required';
        } else if (username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return Object.keys(errors).length === 0;
    }

    async function handleSignIn() {
        if (!validateForm()) return;

        isLoading = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically make an actual API call
        console.log('Sign in attempt:', { username, password, rememberMe });
        
        isLoading = false;
        close();
        
        // Reset form
        username = '';
        password = '';
        rememberMe = false;
        errors = {};
    }

    function handleCreateAccount() {
        console.log('Redirect to create account');
        // Here you would typically navigate to a registration page
        close();
    }

    // Close modal when clicking outside
    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            close();
        }
    }

    onMount(() => {
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = '';
            }
        };
    });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <!-- Backdrop -->
    <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}
        on:click={handleBackdropClick}
        role="button"
        tabindex="-1"
        aria-label="Close modal"
    ></div>

    <!-- Modal -->
    <div 
        bind:this={modalElement}
        class="fixed top-0 right-0 w-full max-w-md h-full shadow-2xl bg-white z-50 flex flex-col"
        transition:slide={{ duration: 400, axis: 'x', easing: cubicInOut }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 id="modal-title" class="text-2xl font-semibold text-gray-900">
                Welcome Back
            </h2>
            
            <button 
                on:click={close}
                class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close sign in modal"
            >
                <Icon icon="mdi:close" class="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <!-- Content -->
        <div class="flex-1 px-6 py-8 overflow-y-auto">
            <form on:submit|preventDefault={handleSignIn} class="space-y-6">
                <!-- Username Field -->
                <div class="space-y-2">
                    <label for="username" class="block text-sm font-medium text-gray-700">
                        Username or Email
                    </label>
                    <div class="relative">
                        <input
                            bind:this={usernameInput}
                            bind:value={username}
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 {errors.username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}"
                            class:border-red-500={errors.username}
                            disabled={isLoading}
                        />
                        <Icon 
                            icon="mdi:account-outline" 
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                        />
                    </div>
                    {#if errors.username}
                        <p class="text-sm text-red-600" transition:slide={{ duration: 200 }}>
                            {errors.username}
                        </p>
                    {/if}
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div class="relative">
                        <input
                            bind:value={password}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 {errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            on:click={() => showPassword = !showPassword}
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <Icon 
                                icon={showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} 
                                class="w-5 h-5" 
                            />
                        </button>
                    </div>
                    {#if errors.password}
                        <p class="text-sm text-red-600" transition:slide={{ duration: 200 }}>
                            {errors.password}
                        </p>
                    {/if}
                </div>

                <!-- Remember Me -->
                <div class="flex items-center space-x-3">
                    <label class="flex items-center cursor-pointer">
                        <input
                            bind:checked={rememberMe}
                            type="checkbox"
                            class="sr-only"
                            disabled={isLoading}
                        />
                        <div class="relative">
                            <div class="w-5 h-5 border-2 border-gray-300 rounded transition-colors duration-200 {rememberMe ? 'bg-blue-500 border-blue-500' : 'bg-white'}">
                                {#if rememberMe}
                                    <Icon icon="mdi:check" class="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                                {/if}
                            </div>
                        </div>
                        <span class="ml-3 text-sm text-gray-700">Remember me for 30 days</span>
                    </label>
                </div>

                <!-- Sign In Button -->
                <button
                    type="submit"
                    disabled={isLoading}
                    class="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {#if isLoading}
                        <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
                        <span>Signing In...</span>
                    {:else}
                        <span>Sign In</span>
                        <Icon icon="mdi:arrow-right" class="w-4 h-4" />
                    {/if}
                </button>
            </form>

            <!-- Divider -->
            <div class="relative my-8">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                    <span class="px-4 bg-white text-gray-500">or</span>
                </div>
            </div>

            <!-- Create Account Button -->
            <button
                on:click={handleCreateAccount}
                disabled={isLoading}
                class="w-full py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
                <Icon icon="mdi:account-plus-outline" class="w-4 h-4" />
                <span>Create New Account</span>
            </button>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div class="text-center">
                <a 
                    href="/forgot-password" 
                    class="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center justify-center space-x-1"
                    on:click={close}
                >
                    <Icon icon="mdi:help-circle-outline" class="w-4 h-4" />
                    <span>Forgot your password?</span>
                </a>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Custom scrollbar for modal content */
    :global(.modal-content::-webkit-scrollbar) {
        width: 6px;
    }
    
    :global(.modal-content::-webkit-scrollbar-track) {
        background: transparent;
    }
    
    :global(.modal-content::-webkit-scrollbar-thumb) {
        background: #d1d5db;
        border-radius: 3px;
    }
    
    :global(.modal-content::-webkit-scrollbar-thumb:hover) {
        background: #9ca3af;
    }
</style>