<template>
  <div class="password-generator">
    <div class="tool-header">
      <h1 class="tool-title">Password Generator</h1>
      <p class="tool-description">Generate secure passwords with customizable options</p>
    </div>

    <div class="tool-content">
      <div class="settings-section">
        <h3>Password Settings</h3>
        
        <div class="setting-group">
          <label for="length">Password Length: {{ passwordLength }}</label>
          <input
            id="length"
            v-model="passwordLength"
            type="range"
            min="4"
            max="64"
            class="slider"
          />
        </div>

        <div class="setting-group">
          <label class="checkbox-label">
            <input v-model="includeUppercase" type="checkbox" />
            <span class="checkmark"></span>
            Include Uppercase Letters (A-Z)
          </label>
        </div>

        <div class="setting-group">
          <label class="checkbox-label">
            <input v-model="includeLowercase" type="checkbox" />
            <span class="checkmark"></span>
            Include Lowercase Letters (a-z)
          </label>
        </div>

        <div class="setting-group">
          <label class="checkbox-label">
            <input v-model="includeNumbers" type="checkbox" />
            <span class="checkmark"></span>
            Include Numbers (0-9)
          </label>
        </div>

        <div class="setting-group">
          <label class="checkbox-label">
            <input v-model="includeSymbols" type="checkbox" />
            <span class="checkmark"></span>
            Include Symbols (!@#$%^&*)
          </label>
        </div>

        <div class="setting-group">
          <label class="checkbox-label">
            <input v-model="excludeSimilar" type="checkbox" />
            <span class="checkmark"></span>
            Exclude Similar Characters (i, l, 1, L, o, 0, O)
          </label>
        </div>

        <button @click="generatePassword" class="btn-primary generate-btn">
          Generate Password
        </button>
      </div>

      <div class="output-section">
        <h3>Generated Password</h3>
        
        <div class="password-output">
          <input
            v-model="generatedPassword"
            type="text"
            readonly
            class="password-field"
            placeholder="Generated password will appear here..."
          />
          <button @click="copyPassword" class="btn-secondary copy-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>

        <div v-if="generatedPassword" class="password-strength">
          <div class="strength-bar">
            <div 
              class="strength-fill" 
              :class="strengthClass"
              :style="{ width: strengthPercentage + '%' }"
            ></div>
          </div>
          <span class="strength-text">Strength: {{ strengthText }}</span>
        </div>

        <div class="batch-generation">
          <h4>Generate Multiple Passwords</h4>
          <div class="batch-controls">
            <label for="batch-count">Count:</label>
            <select id="batch-count" v-model="batchCount" class="batch-select">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <button @click="generateBatch" class="btn-secondary">Generate Batch</button>
          </div>
          
          <div v-if="batchPasswords.length > 0" class="batch-results">
            <div class="batch-header">
              <h5>Generated Passwords</h5>
              <button @click="copyAllPasswords" class="btn-secondary">Copy All</button>
            </div>
            <div class="password-list">
              <div v-for="(password, index) in batchPasswords" :key="index" class="password-item">
                <code>{{ password }}</code>
                <button @click="copyToClipboard(password)" class="copy-single">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const passwordLength = ref(12)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(false)
const excludeSimilar = ref(false)
const generatedPassword = ref('')
const batchCount = ref(10)
const batchPasswords = ref<string[]>([])

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
const numberChars = '0123456789'
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const similarChars = 'il1Lo0O'

const characterSet = computed(() => {
  let chars = ''
  if (includeUppercase.value) chars += uppercaseChars
  if (includeLowercase.value) chars += lowercaseChars
  if (includeNumbers.value) chars += numberChars
  if (includeSymbols.value) chars += symbolChars
  
  if (excludeSimilar.value) {
    chars = chars.split('').filter(char => !similarChars.includes(char)).join('')
  }
  
  return chars
})

const passwordStrength = computed(() => {
  if (!generatedPassword.value) return 0
  
  let score = 0
  const password = generatedPassword.value
  
  // Length score
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 25
  
  // Character variety score
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 10
  if (/[^A-Za-z0-9]/.test(password)) score += 20
  
  return Math.min(score, 100)
})

const strengthPercentage = computed(() => passwordStrength.value)

const strengthClass = computed(() => {
  if (passwordStrength.value < 40) return 'weak'
  if (passwordStrength.value < 70) return 'medium'
  return 'strong'
})

const strengthText = computed(() => {
  if (passwordStrength.value < 40) return 'Weak'
  if (passwordStrength.value < 70) return 'Medium'
  return 'Strong'
})

const generatePassword = () => {
  if (characterSet.value.length === 0) {
    alert('Please select at least one character type')
    return
  }
  
  let password = ''
  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.value.length)
    password += characterSet.value[randomIndex]
  }
  
  generatedPassword.value = password
}

const generateBatch = () => {
  if (characterSet.value.length === 0) {
    alert('Please select at least one character type')
    return
  }
  
  const passwords = []
  for (let i = 0; i < batchCount.value; i++) {
    let password = ''
    for (let j = 0; j < passwordLength.value; j++) {
      const randomIndex = Math.floor(Math.random() * characterSet.value.length)
      password += characterSet.value[randomIndex]
    }
    passwords.push(password)
  }
  
  batchPasswords.value = passwords
}

const copyPassword = async () => {
  if (generatedPassword.value) {
    try {
      await navigator.clipboard.writeText(generatedPassword.value)
    } catch (error) {
      console.error('Failed to copy password:', error)
    }
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const copyAllPasswords = async () => {
  if (batchPasswords.value.length > 0) {
    try {
      await navigator.clipboard.writeText(batchPasswords.value.join('\n'))
    } catch (error) {
      console.error('Failed to copy passwords:', error)
    }
  }
}

// Generate initial password
generatePassword()
</script>

<style scoped>
.password-generator {
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
  gap: 32px;
}

.settings-section h3,
.output-section h3 {
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 20px;
}

.setting-group {
  margin-bottom: 16px;
}

.setting-group label {
  display: block;
  font-size: 14px;
  color: #3c4043;
  margin-bottom: 4px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4285f4;
  cursor: pointer;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #3c4043;
}

.checkbox-label input {
  margin-right: 8px;
}

.generate-btn {
  width: 100%;
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
}

.generate-btn:hover {
  background: #3367d6;
}

.password-output {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.password-field {
  flex: 1;
  padding: 12px;
  border: 1px solid #dadce0;
  border-radius: 6px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 16px;
  background: #f8f9fa;
}

.copy-btn,
.copy-single {
  background: #f8f9fa;
  color: #3c4043;
  border: 1px solid #dadce0;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover,
.copy-single:hover {
  background: #f1f3f4;
}

.password-strength {
  margin-bottom: 24px;
}

.strength-bar {
  width: 100%;
  height: 8px;
  background: #e8eaed;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-fill.weak {
  background: #ea4335;
}

.strength-fill.medium {
  background: #fbbc04;
}

.strength-fill.strong {
  background: #34a853;
}

.strength-text {
  font-size: 14px;
  color: #5f6368;
}

.batch-generation {
  border-top: 1px solid #dadce0;
  padding-top: 24px;
}

.batch-generation h4 {
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 12px;
}

.batch-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.batch-select {
  padding: 6px 8px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
}

.btn-secondary {
  background: #f8f9fa;
  color: #3c4043;
  border: 1px solid #dadce0;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: #f1f3f4;
}

.batch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.batch-header h5 {
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  margin: 0;
}

.password-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #dadce0;
  border-radius: 6px;
  background: #f8f9fa;
}

.password-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e8eaed;
}

.password-item:last-child {
  border-bottom: none;
}

.password-item code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  color: #3c4043;
  background: none;
  padding: 0;
}

.copy-single {
  padding: 4px;
  min-width: auto;
  height: auto;
}

@media (max-width: 768px) {
  .tool-content {
    grid-template-columns: 1fr;
  }
  
  .password-output {
    flex-direction: column;
  }
  
  .batch-controls {
    flex-wrap: wrap;
  }
}
</style>
