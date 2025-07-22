<template>
  <div class="json-formatter">
    <div class="tool-header">
      <h1 class="tool-title">JSON Formatter</h1>
      <p class="tool-description">Format, validate, and beautify JSON data</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <div class="section-header">
          <h3>Input JSON</h3>
          <div class="actions">
            <button @click="clearInput" class="btn-secondary">Clear</button>
            <button @click="formatJson" class="btn-primary">Format</button>
          </div>
        </div>
        <textarea
          v-model="inputJson"
          placeholder="Paste your JSON here..."
          class="json-input"
          rows="12"
        ></textarea>
      </div>

      <div class="output-section">
        <div class="section-header">
          <h3>Formatted JSON</h3>
          <div class="actions">
            <button @click="copyOutput" class="btn-secondary">Copy</button>
            <button @click="minifyJson" class="btn-secondary">Minify</button>
          </div>
        </div>
        <pre class="json-output" :class="{ error: hasError }"><code>{{ outputJson }}</code></pre>
      </div>
    </div>

    <div v-if="hasError" class="error-message">
      <strong>Error:</strong> {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const inputJson = ref('')
const outputJson = ref('')
const errorMessage = ref('')

const hasError = computed(() => errorMessage.value !== '')

const formatJson = () => {
  try {
    errorMessage.value = ''
    if (!inputJson.value.trim()) {
      outputJson.value = ''
      return
    }
    
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, 2)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Invalid JSON'
    outputJson.value = ''
  }
}

const minifyJson = () => {
  try {
    errorMessage.value = ''
    if (!inputJson.value.trim()) {
      outputJson.value = ''
      return
    }
    
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Invalid JSON'
    outputJson.value = ''
  }
}

const clearInput = () => {
  inputJson.value = ''
  outputJson.value = ''
  errorMessage.value = ''
}

const copyOutput = async () => {
  if (outputJson.value) {
    try {
      await navigator.clipboard.writeText(outputJson.value)
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
}

// Auto-format on input change (debounced)
let timeoutId: NodeJS.Timeout
const debouncedFormat = () => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(formatJson, 500)
}

// Watch for input changes
watch(inputJson, debouncedFormat)
</script>

<style scoped>
.json-formatter {
  max-width: 1200px;
  margin: 0 auto;
}

.tool-header {
  text-align: center;
  margin-bottom: 32px;
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
  margin: 0;
}

.tool-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  background: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #3367d6;
}

.btn-secondary {
  background: #f8f9fa;
  color: #3c4043;
  border: 1px solid #dadce0;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: #f1f3f4;
}

.json-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.json-input:focus {
  border-color: #4285f4;
}

.json-output {
  width: 100%;
  min-height: 300px;
  padding: 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  background: #f8f9fa;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.json-output.error {
  background: #fef7f0;
  border-color: #ea4335;
}

.error-message {
  background: #fef7f0;
  border: 1px solid #ea4335;
  border-radius: 8px;
  padding: 12px;
  color: #d93025;
  font-size: 14px;
}

@media (max-width: 768px) {
  .tool-content {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .actions {
    align-self: stretch;
    justify-content: flex-end;
  }
}
</style>
