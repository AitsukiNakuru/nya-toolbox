// components/tools/Base64Encoder.vue
<template>
  <div class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('tools.base64-encoder.textInput') }}
        </label>
        <textarea
          v-model="inputText"
          :placeholder="$t('tools.base64-encoder.inputPlaceholder')"
          class="w-full h-60 p-3 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
        
        <div class="flex gap-2 mt-3">
          <button
            @click="encodeText"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {{ $t('tools.base64-encoder.encodeButton') }}
          </button>
          <button
            @click="decodeText"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            {{ $t('tools.base64-encoder.decodeButton') }}
          </button>
          <button
            @click="clearAll"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            {{ $t('tools.base64-encoder.clearButton') }}
          </button>
        </div>
      </div>

      <!-- Output Section -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-sm font-medium text-gray-700">
            {{ $t('tools.base64-encoder.output') }}
          </label>
          <button
            v-if="outputText"
            @click="copyToClipboard"
            class="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 transition-colors"
          >
            {{ copied ? $t('tools.base64-encoder.copiedButton') : $t('tools.base64-encoder.copyButton') }}
          </button>
        </div>
        
        <textarea
          v-model="outputText"
          readonly
          :placeholder="$t('tools.base64-encoder.outputPlaceholder')"
          class="w-full h-60 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm resize-none"
        ></textarea>
        
        <!-- Error message -->
        <div v-if="errorMessage" class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
      <h3 class="text-sm font-medium text-gray-900 mb-2">{{ $t('tools.base64-encoder.infoTitle') }}</h3>
      <p class="text-sm text-gray-600">
        {{ $t('tools.base64-encoder.infoContent') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()

const inputText = ref('')
const outputText = ref('')
const errorMessage = ref('')
const copied = ref(false)

const encodeText = () => {
  errorMessage.value = ''
  
  if (!inputText.value) {
    outputText.value = ''
    return
  }
  
  try {
    // 使用 TextEncoder 替代 unescape(encodeURIComponent())
    const encoder = new TextEncoder()
    const data = encoder.encode(inputText.value)
    outputText.value = btoa(String.fromCharCode(...data))
  } catch (error) {
    errorMessage.value = t('tools.base64-encoder.encodeError')
  }
}

const decodeText = () => {
  errorMessage.value = ''
  
  if (!inputText.value) {
    outputText.value = ''
    return
  }
  
  try {
    // 使用 TextDecoder 替代 decodeURIComponent(escape())
    const binaryString = atob(inputText.value)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const decoder = new TextDecoder()
    outputText.value = decoder.decode(bytes)
  } catch (error) {
    errorMessage.value = t('tools.base64-encoder.decodeError')
  }
}

const clearAll = () => {
  inputText.value = ''
  outputText.value = ''
  errorMessage.value = ''
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
  }
}
</script>
