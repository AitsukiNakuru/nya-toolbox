<template>
  <div class="min-h-[calc(100vh-200px)]">
    <div v-if="tool" class="max-w-6xl mx-auto px-5 md:px-4">
      <!-- Tool Header -->
      <div class="mb-8">
        <div class="mb-6 text-sm">
          <NuxtLink :to="$localePath('/')" class="text-google-blue no-underline transition-colors hover:text-google-blue-dark">{{ $t('layout.tools') }}</NuxtLink>
          <span class="mx-2 text-gray-600">/</span>
          <span class="text-gray-600">{{ $t(`tools.${tool.id}.title`) }}</span>
        </div>
        
        <div class="flex items-start gap-5 flex-col md:flex-row md:items-center text-center md:text-left md:gap-4">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0" :style="{ background: getToolColor(tool.tags) }">
            <component :is="getIconComponent(tool.icon)" />
          </div>
          <div class="flex-1">
            <h1 class="text-3xl md:text-4xl font-normal text-gray-900 mb-2 md:text-[28px]">{{ $t(`tools.${tool.id}.title`) }}</h1>
            <p class="text-base text-gray-600 mb-4 leading-relaxed">{{ $t(`tools.${tool.id}.description`) }}</p>
            <div class="flex gap-2 flex-wrap justify-center md:justify-start">
              <span v-for="tag in tool.tags" :key="tag" class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full whitespace-nowrap">{{ $t(`tags.${tag}`) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dynamic Tool Component -->
      <div class="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <component v-if="tool && toolComponent" :is="toolComponent" />
      </div>
    </div>

    <div v-else class="text-center py-20 px-5 text-gray-600">
      <h1 class="text-4xl text-gray-900 mb-4">{{ $t('tool.notFound') }}</h1>
      <p class="mb-4">{{ $t('tool.notFoundDescription') }}</p>
      <NuxtLink :to="$localePath('/')" class="text-google-blue no-underline font-medium transition-colors hover:text-google-blue-dark">{{ $t('tool.backToTools') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveComponent } from 'vue'
import toolboxData from '../../content/toolbox.json'

definePageMeta({
  layout: 'toolbox',
})

// Get the tool ID from route params
const route = useRoute()
const toolId = route.params.id as string

// Find the tool configuration
const tool = computed(() => {
  return toolboxData.tools.find((t: any) => t.id === toolId)
})

// Resolve the tool component
const toolComponent = computed(() => {
  if (!tool.value) return null
  try {
    return resolveComponent(tool.value.component)
  } catch (error) {
    console.error('Failed to resolve component:', tool.value.component, error)
    return null
  }
})

// Methods
const getToolColor = (tags: string[]) => {
  const tagCategories = toolboxData?.tagCategories || {}
  
  // Find the first tag that has a defined category color
  for (const tag of tags) {
    if (tagCategories[tag as keyof typeof tagCategories]) {
      return tagCategories[tag as keyof typeof tagCategories].color
    }
  }
  
  // Default color if no category tag found
  return '#4285f4'
}

const getIconComponent = (iconEmoji: string) => {
  return () => h('span', { style: 'font-size: 24px;' }, iconEmoji)
}

// Set page title
useHead({
  title: computed(() => tool.value ? `${$t(`tools.${tool.value.id}.title`)} - ${$t('pages.index.title')}` : `${$t('tool.notFound')} - ${$t('pages.index.title')}`)
})
</script>
