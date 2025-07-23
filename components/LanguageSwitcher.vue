<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click.stop="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <span>{{ currentLocaleName }}</span>
      <svg 
        class="w-4 h-4 transition-transform duration-200" 
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <div
      v-show="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50"
    >
      <div class="py-1">
        <button
          @click="switchLanguage('zh-CN')"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700': currentLocale === 'zh-CN' }"
        >
          中文
        </button>
        <button
          @click="switchLanguage('en-US')"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors"
          :class="{ 'bg-blue-50 text-blue-700': currentLocale === 'en-US' }"
        >
          English
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { $i18n } = useNuxtApp()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const currentLocale = computed(() => {
  // Check the current route to determine locale
  const route = router.currentRoute.value
  const path = route.path
  
  if (path.startsWith('/zh-CN')) {
    return 'zh-CN'
  } else if (path.startsWith('/en-US')) {
    return 'en-US'
  }
  return 'zh-CN' // default fallback
})

const currentLocaleName = computed(() => {
  return currentLocale.value === 'zh-CN' ? '中文' : 'English'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = async (localeCode: 'en-US' | 'zh-CN') => {
  try {
    console.log('Switching to locale:', localeCode)
    isOpen.value = false
    
    // Get current route path without locale prefix
    const currentRoute = router.currentRoute.value
    let currentPath = currentRoute.path
    
    // Remove existing locale prefix if any
    if (currentPath.startsWith('/en-US')) {
      currentPath = currentPath.substring(6) || '/'
    } else if (currentPath.startsWith('/zh-CN')) {
      currentPath = currentPath.substring(6) || '/'
    }
    
    // With 'prefix' strategy, all locales have prefixes
    let newPath: string = `/${localeCode}${currentPath}`
    
    // Ensure we don't have double slashes
    newPath = newPath.replace(/\/+/g, '/')
    
    console.log('Current path:', currentPath)
    console.log('New path:', newPath)
    
    // Navigate to the new path
    await router.push(newPath)
  } catch (error) {
    console.error('Error switching language:', error)
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
