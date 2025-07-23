<template>
  <div class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          JSON Input
        </label>
        <textarea
          v-model="inputJson"
          placeholder="Paste your JSON here..."
          class="w-full h-80 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @input="formatJson"
        ></textarea>
        
        <div class="flex gap-2 mt-3">
          <button
            @click="formatJson"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Format JSON
          </button>
          <button
            @click="minifyJson"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Minify
          </button>
          <button
            @click="clearInput"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Output Section -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-700">
            Formatted Output
          </label>
          <button
            v-if="outputJson"
            @click="copyToClipboard"
            class="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
          >
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        
        <div class="relative">
          <pre
            class="w-full h-80 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm overflow-auto"
            :class="{ 'border-red-300 bg-red-50': hasError, 'border-green-300 bg-green-50': isValid }"
          ><code>{{ outputJson || 'Formatted JSON will appear here...' }}</code></pre>
          
          <!-- Status indicator -->
          <div v-if="inputJson" class="absolute top-2 right-2">
            <span
              v-if="isValid"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              ✓ Valid JSON
            </span>
            <span
              v-else-if="hasError"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
            >
              ✗ Invalid JSON
            </span>
          </div>
        </div>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <!-- JSON Info -->
    <div v-if="jsonInfo" class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
      <h3 class="text-sm font-medium text-blue-900 mb-2">JSON Information</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span class="text-blue-700 font-medium">Size:</span>
          <span class="text-blue-600 ml-1">{{ jsonInfo.size }} characters</span>
        </div>
        <div>
          <span class="text-blue-700 font-medium">Lines:</span>
          <span class="text-blue-600 ml-1">{{ jsonInfo.lines }}</span>
        </div>
        <div>
          <span class="text-blue-700 font-medium">Type:</span>
          <span class="text-blue-600 ml-1">{{ jsonInfo.type }}</span>
        </div>
        <div v-if="jsonInfo.keys">
          <span class="text-blue-700 font-medium">Keys:</span>
          <span class="text-blue-600 ml-1">{{ jsonInfo.keys }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const inputJson = ref('')
const outputJson = ref('')
const errorMessage = ref('')
const copied = ref(false)

const isValid = computed(() => {
  return inputJson.value && !errorMessage.value && outputJson.value
})

const hasError = computed(() => {
  return inputJson.value && errorMessage.value
})

const jsonInfo = computed(() => {
  if (!isValid.value) return null
  
  try {
    const parsed = JSON.parse(inputJson.value)
    const size = inputJson.value.length
    const lines = outputJson.value.split('\n').length
    const type = Array.isArray(parsed) ? 'Array' : typeof parsed
    const keys = typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? Object.keys(parsed).length
      : null
    
    return { size, lines, type, keys }
  } catch {
    return null
  }
})

const formatJson = () => {
  errorMessage.value = ''
  
  if (!inputJson.value.trim()) {
    outputJson.value = ''
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, 2)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Invalid JSON format'
    outputJson.value = ''
  }
}

const minifyJson = () => {
  errorMessage.value = ''
  
  if (!inputJson.value.trim()) {
    outputJson.value = ''
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Invalid JSON format'
    outputJson.value = ''
  }
}

const clearInput = () => {
  inputJson.value = ''
  outputJson.value = ''
  errorMessage.value = ''
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
  }
}

// Auto-format on mount if there's initial content
onMounted(() => {
  if (inputJson.value) {
    formatJson()
  }
})
</script>
