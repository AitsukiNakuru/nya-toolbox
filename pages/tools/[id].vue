<template>
  <div class="tool-page">
    <div v-if="tool" class="tool-container">
      <!-- Tool Header -->
      <div class="tool-header">
        <div class="breadcrumb">
          <NuxtLink to="/" class="breadcrumb-link">Tools</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ tool.title }}</span>
        </div>
        
        <div class="tool-meta">
          <div class="tool-icon" :style="{ background: getToolColor(tool.category) }">
            <component :is="getIconComponent(tool.icon)" />
          </div>
          <div class="tool-info">
            <h1 class="tool-title">{{ tool.title }}</h1>
            <p class="tool-description">{{ tool.description }}</p>
            <div class="tool-tags">
              <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dynamic Tool Component -->
      <div class="tool-component">
        <component :is="tool.component" />
      </div>
    </div>

    <div v-else class="not-found">
      <h1>Tool Not Found</h1>
      <p>The requested tool could not be found.</p>
      <NuxtLink to="/" class="back-link">← Back to Tools</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import toolboxData from '../../content/toolbox.json'

// Dynamic components
import JsonFormatter from '~/components/tools/JsonFormatter.vue'
import Base64Encoder from '~/components/tools/Base64Encoder.vue'
import PasswordGenerator from '~/components/tools/PasswordGenerator.vue'

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

// Component mapping
const componentMap: Record<string, any> = {
  JsonFormatter,
  Base64Encoder,
  PasswordGenerator,
  // Add more components as they are created
}

// Methods
const getToolColor = (categoryId: string) => {
  const category = toolboxData.categories.find((cat: any) => cat.id === categoryId)
  return category?.color || '#4285f4'
}

const getIconComponent = (iconEmoji: string) => {
  return () => h('span', { style: 'font-size: 24px;' }, iconEmoji)
}

// Register components dynamically
if (tool.value && componentMap[tool.value.component]) {
  // Component exists, ready to render
} else if (tool.value) {
  // Tool exists but component not found, you could show a placeholder
  console.warn(`Component ${tool.value.component} not found for tool ${tool.value.id}`)
}

// Set page title
useHead({
  title: tool.value ? `${tool.value.title} - Developer Toolbox` : 'Tool Not Found - Developer Toolbox'
})
</script>

<style scoped>
.tool-page {
  min-height: calc(100vh - 200px);
}

.tool-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.tool-header {
  margin-bottom: 32px;
}

.breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
}

.breadcrumb-link {
  color: #4285f4;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #3367d6;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #5f6368;
}

.breadcrumb-current {
  color: #5f6368;
}

.tool-meta {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.tool-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.tool-info {
  flex: 1;
}

.tool-title {
  font-size: 32px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 8px;
}

.tool-description {
  font-size: 16px;
  color: #5f6368;
  margin: 0 0 16px;
  line-height: 1.5;
}

.tool-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f1f3f4;
  color: #5f6368;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 16px;
  white-space: nowrap;
}

.tool-component {
  background: white;
  border-radius: 8px;
  border: 1px solid #dadce0;
  overflow: hidden;
}

.not-found {
  text-align: center;
  padding: 80px 20px;
  color: #5f6368;
}

.not-found h1 {
  font-size: 32px;
  color: #202124;
  margin-bottom: 16px;
}

.back-link {
  color: #4285f4;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #3367d6;
}

@media (max-width: 768px) {
  .tool-meta {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }
  
  .tool-title {
    font-size: 28px;
  }
  
  .tool-container {
    padding: 0 16px;
  }
}
</style>
