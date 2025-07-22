<template>
  <div class="tools-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <h1 class="hero-title">Developer Toolbox</h1>
      <p class="hero-subtitle">Essential tools for developers, all in one place</p>
    </section>

    <!-- Category Filter -->
    <section class="filter-section">
      <div class="category-filters">
        <button 
          @click="selectedCategory = null"
          :class="{ active: selectedCategory === null }"
          class="category-btn"
        >
          All Tools
        </button>
        <button 
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="{ active: selectedCategory === category.id }"
          class="category-btn"
          :style="{ '--category-color': category.color }"
        >
          {{ category.name }}
        </button>
      </div>
    </section>

    <!-- Tools Grid -->
    <section class="tools-section">
      <div class="tools-grid">
        <div 
          v-for="tool in filteredTools"
          :key="tool.id"
          class="tool-card"
          @click="openTool(tool)"
        >
          <div class="tool-icon" :style="{ background: getToolColor(tool.category) }">
            <component :is="getIconComponent(tool.icon)" />
          </div>
          <h3 class="tool-title">{{ tool.title }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <div class="tool-tags">
            <span v-for="tag in tool.tags.slice(0, 3)" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <button class="tool-button">Open Tool</button>
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
const selectedCategory = ref<string | null>(null)

// Computed properties
const tools = computed(() => toolboxConfig?.tools || [])
const categories = computed(() => toolboxConfig?.categories || [])

const filteredTools = computed(() => {
  if (!selectedCategory.value) {
    return tools.value
  }
  return tools.value.filter((tool: any) => tool.category === selectedCategory.value)
})

// Methods
const openTool = (tool: any) => {
  // Navigate to tool page
  navigateTo(`/tools/${tool.id}`)
}

const getToolColor = (categoryId: string) => {
  const category = categories.value.find((cat: any) => cat.id === categoryId)
  return category?.color || '#4285f4'
}

const getIconComponent = (iconEmoji: string) => {
  return () => h('span', { style: 'font-size: 24px;' }, iconEmoji)
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  text-align: center;
  padding: 40px 0 60px;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 56px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 20px;
  color: #5f6368;
  margin: 0;
  font-weight: 400;
}

/* Filter Section */
.filter-section {
  margin-bottom: 40px;
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 20px;
}

.category-btn {
  background: #f8f9fa;
  color: #3c4043;
  border: 1px solid #dadce0;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.category-btn:hover {
  background: #f1f3f4;
  border-color: #4285f4;
}

.category-btn.active {
  background: var(--category-color, #4285f4);
  color: white;
  border-color: var(--category-color, #4285f4);
}

/* Tools Section */
.tools-section {
  max-width: 1200px;
  margin: 0 auto;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 0 20px;
}

/* Tool Cards */
.tool-card {
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.tool-card:hover {
  border-color: #4285f4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.tool-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4285f4, #34a853);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 16px;
}

.tool-title {
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px;
}

.tool-description {
  font-size: 14px;
  color: #5f6368;
  line-height: 1.5;
  margin: 0 0 12px;
}

.tool-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tag {
  background: #f1f3f4;
  color: #5f6368;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
}

.tool-button {
  background: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.tool-button:hover {
  background: #3367d6;
}

.tool-button:active {
  background: #2851a3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
  }
  
  .tool-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 20px 0 40px;
    margin-bottom: 20px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .tools-grid {
    padding: 0 12px;
  }
  
  .tool-card {
    padding: 16px;
  }
}

/* Animation for card loading */
.tool-card {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation delay */
.tool-card:nth-child(1) { animation-delay: 0.1s; }
.tool-card:nth-child(2) { animation-delay: 0.2s; }
.tool-card:nth-child(3) { animation-delay: 0.3s; }
.tool-card:nth-child(4) { animation-delay: 0.4s; }
.tool-card:nth-child(5) { animation-delay: 0.5s; }
.tool-card:nth-child(6) { animation-delay: 0.6s; }
.tool-card:nth-child(7) { animation-delay: 0.7s; }
.tool-card:nth-child(8) { animation-delay: 0.8s; }
.tool-card:nth-child(9) { animation-delay: 0.9s; }
</style>