<template>
  <div class="min-h-screen flex flex-col font-sans bg-white">
    <!-- Header -->
    <header class="border-b border-gray-300 bg-white sticky top-0 z-50">
      <div class="flex items-center justify-between px-5 py-2 max-w-7xl mx-auto min-h-[60px] md:px-4 md:flex-wrap md:gap-3">
        <div class="flex-none">
          <NuxtLink :to="$localePath('/')" class="no-underline text-gray-900 text-xl font-normal tracking-tight sm:text-lg">
            <span class="text-google-blue font-medium">Toolbox</span>
          </NuxtLink>
        </div>
        
        <div class="flex-1 flex justify-center max-w-[584px] mx-auto md:order-3 md:w-full md:mt-2">
          <div class="w-full max-w-[584px] md:max-w-none">
            <div class="relative flex items-center w-full max-w-[584px] h-11 border border-gray-300 rounded-3xl px-4 bg-white transition-shadow duration-200 hover:shadow-lg focus-within:border-google-blue focus-within:shadow-blue-200 focus-within:shadow-md">
              <svg class="text-gray-400 mr-3 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search tools..." 
                class="flex-1 border-none outline-none text-base text-gray-900 bg-transparent font-sans placeholder-gray-400 sm:text-sm"
                v-model="searchQuery"
                @input="handleSearch"
              />
              <button v-if="searchQuery" @click="clearSearch" class="bg-none border-none p-1 ml-2 text-gray-400 cursor-pointer rounded-full flex items-center justify-center transition-colors hover:bg-gray-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex-none">
          <nav class="flex items-center gap-4 md:gap-2">
            <LanguageSwitcher />
            <NuxtLink :to="$localePath('/about')" class="no-underline text-gray-600 text-sm px-4 py-2 rounded transition-colors hover:bg-gray-100 hover:text-gray-900 md:px-3 md:py-1.5 md:text-xs">{{ $t('layout.about') }}</NuxtLink>
            <button class="bg-none border-none p-2 rounded-full cursor-pointer transition-colors hover:bg-gray-100 flex items-center justify-center">
              <div class="w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 py-10 px-5 max-w-7xl mx-auto w-full md:py-5 md:px-4 sm:py-4 sm:px-3">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-300 bg-gray-50 mt-auto">
      <div class="py-4 px-5 max-w-7xl mx-auto">
        <div class="flex justify-center gap-6 flex-wrap md:gap-4 md:text-xs">
          <NuxtLink :to="$localePath('/privacy')" class="no-underline text-gray-600 text-sm transition-colors hover:text-gray-900">{{ $t('layout.privacy') }}</NuxtLink>
          <NuxtLink :to="$localePath('/terms')" class="no-underline text-gray-600 text-sm transition-colors hover:text-gray-900">{{ $t('layout.terms') }}</NuxtLink>
          <NuxtLink :to="$localePath('/help')" class="no-underline text-gray-600 text-sm transition-colors hover:text-gray-900">{{ $t('layout.help') }}</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive data
const searchQuery = ref('')

// Methods
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Handle search logic here
  console.log('Searching for:', target.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>