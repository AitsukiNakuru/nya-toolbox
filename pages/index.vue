<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="text-center py-16 px-4">
      <h1 class="text-4xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
        {{ $t('pages.index.title') }}
      </h1>
      <p class="text-lg md:text-xl text-gray-600 font-light">
        {{ $t('pages.index.description') }}
      </p>
    </section>

    <!-- Tag Filter -->
    <section class="mb-10 px-4">
      <div class="flex justify-center gap-3 flex-wrap max-w-4xl mx-auto">
        <button 
          @click="selectedTag = null"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedTag === null 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-blue-500'
          ]"
          class="border whitespace-nowrap"
        >
          {{ $t('tags.allTools') }}
        </button>
        <button 
          v-for="tag in popularTags"
          :key="tag.name"
          @click="selectedTag = tag.name"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap',
            selectedTag === tag.name 
              ? 'text-white border-transparent' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-blue-500'
          ]"
          :style="selectedTag === tag.name ? { background: tag.color, borderColor: tag.color } : {}"
        >
          {{ $t(`tags.${tag.name}`) }}
        </button>
      </div>
    </section>

    <!-- Tools Grid -->
    <section class="max-w-7xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        <div 
          v-for="(tool, index) in filteredTools"
          :key="tool.id"
          class="bg-white border border-gray-200 rounded-lg p-3 transition-all duration-200 ease-in-out cursor-pointer relative overflow-hidden group hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
          @click="openTool(tool)"
        >
          <div 
            class="w-6 h-6 rounded-lg flex items-center justify-center text-white mb-2 text-sm"
            :style="{ background: getToolColor(tool.tags) }"
          >
            <component :is="getIconComponent(tool.icon)" />
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{{ $t(`tools.${tool.id}.title`) }}</h3>
          <p class="text-xs text-gray-600 mb-2 line-clamp-2 flex-1">{{ $t(`tools.${tool.id}.description`) }}</p>
          <div class="flex gap-1 flex-wrap">
            <span 
              v-for="tag in tool.tags" 
              :key="tag" 
              class="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full"
            >
              {{ $t(`tags.${tag}`) }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import toolboxData from '../content/toolbox.json'

definePageMeta({
  layout: 'toolbox',
})

// Load toolbox configuration from imported JSON
const toolboxConfig = toolboxData

// Reactive data
const selectedTag = ref<string | null>(null)

// Computed properties
const tools = computed(() => toolboxConfig?.tools || [])

// Get popular tags from tagCategories
const popularTags = computed(() => {
  const tagCategories = toolboxConfig?.tagCategories || {}
  return Object.entries(tagCategories).map(([key, value]: [string, any]) => ({
    name: key,
    displayName: value.name,
    color: value.color
  }))
})

const filteredTools = computed(() => {
  if (!selectedTag.value) {
    return tools.value
  }
  return tools.value.filter((tool: any) => tool.tags.includes(selectedTag.value))
})

// Methods
const openTool = (tool: any) => {
  // Navigate to tool page
  navigateTo(`/tools/${tool.id}`)
}

const getToolColor = (tags: string[]) => {
  const tagCategories = toolboxConfig?.tagCategories || {}
  
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
  return () => h('span', { style: 'font-size: 14px;' }, iconEmoji)
}
</script>