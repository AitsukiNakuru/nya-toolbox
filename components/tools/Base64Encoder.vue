<template>
  <div class="base64-encoder">
    <div class="tool-header">
      <h1 class="tool-title">Base64 Encoder/Decoder</h1>
      <p class="tool-description">Encode and decode Base64 strings with ease</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <div class="section-header">
          <h3>Text Input</h3>
          <div class="actions">
            <button @click="clearAll" class="btn-secondary">Clear All</button>
          </div>
        </div>
        <textarea
          v-model="textInput"
          placeholder="Enter text to encode..."
          class="text-input"
          rows="8"
        ></textarea>
        <div class="button-group">
          <button @click="encodeToBase64" class="btn-primary">Encode to Base64</button>
          <button @click="copyEncoded" class="btn-secondary">Copy Encoded</button>
        </div>
      </div>

      <div class="output-section">
        <div class="section-header">
          <h3>Base64 Output</h3>
        </div>
        <textarea
          v-model="base64Output"
          placeholder="Base64 encoded result will appear here..."
          class="base64-output"
          rows="8"
        ></textarea>
        <div class="button-group">
          <button @click="decodeFromBase64" class="btn-primary">Decode from Base64</button>
          <button @click="copyDecoded" class="btn-secondary">Copy Decoded</button>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">
      <strong>Error:</strong> {{ errorMessage }}
    </div>

    <div class="info-section">
      <h3>About Base64 Encoding</h3>
      <p>
        Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
        It's commonly used for encoding data in email, storing complex data in XML or JSON, and embedding images in CSS or HTML.
      </p>
      <ul>
        <li><strong>Safe for URLs:</strong> Base64 encoded strings are URL-safe</li>
        <li><strong>Text representation:</strong> Allows binary data to be stored as text</li>
        <li><strong>Reversible:</strong> Original data can be perfectly reconstructed</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const textInput = ref('')
const base64Output = ref('')
const errorMessage = ref('')

const encodeToBase64 = () => {
  try {
    errorMessage.value = ''
    if (!textInput.value) {
      base64Output.value = ''
      return
    }
    
    base64Output.value = btoa(unescape(encodeURIComponent(textInput.value)))
  } catch (error) {
    errorMessage.value = 'Failed to encode text to Base64'
    base64Output.value = ''
  }
}

const decodeFromBase64 = () => {
  try {
    errorMessage.value = ''
    if (!base64Output.value) {
      textInput.value = ''
      return
    }
    
    textInput.value = decodeURIComponent(escape(atob(base64Output.value)))
  } catch (error) {
    errorMessage.value = 'Invalid Base64 string. Please check your input.'
  }
}

const clearAll = () => {
  textInput.value = ''
  base64Output.value = ''
  errorMessage.value = ''
}

const copyEncoded = async () => {
  if (base64Output.value) {
    try {
      await navigator.clipboard.writeText(base64Output.value)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
}

const copyDecoded = async () => {
  if (textInput.value) {
    try {
      await navigator.clipboard.writeText(textInput.value)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }
}
</script>

<style scoped>
.base64-encoder {
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

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 12px;
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

.text-input,
.base64-output {
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

.text-input:focus,
.base64-output:focus {
  border-color: #4285f4;
}

.error-message {
  background: #fef7f0;
  border: 1px solid #ea4335;
  border-radius: 8px;
  padding: 12px;
  color: #d93025;
  font-size: 14px;
  margin-bottom: 24px;
}

.info-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 32px;
}

.info-section h3 {
  font-size: 18px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 12px;
}

.info-section p {
  color: #5f6368;
  line-height: 1.6;
  margin: 0 0 12px;
}

.info-section ul {
  color: #5f6368;
  margin: 0;
  padding-left: 20px;
}

.info-section li {
  margin-bottom: 4px;
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
  
  .actions,
  .button-group {
    align-self: stretch;
    justify-content: flex-end;
  }
  
  .button-group {
    flex-wrap: wrap;
  }
}
</style>
