<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-3">
          📝 {{ t('tools.essay-generator.pageTitle') }}
        </h1>
        <p class="text-gray-600 text-lg">{{ t('tools.essay-generator.pageDescription') }}</p>
      </div>

      <!-- 输入区域 -->
      <div class="space-y-8 mb-12">
        <!-- 题目输入 -->
        <div class="group">
          <label for="topic" class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            {{ t('tools.essay-generator.topicLabel') }}
            <span class="text-red-500">{{ t('tools.essay-generator.topicRequired') }}</span>
          </label>
          <div class="relative">
            <textarea
              id="topic"
              v-model="topic"
              :placeholder="t('tools.essay-generator.topicPlaceholder')"
              class="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none bg-white hover:bg-gray-50 group-hover:border-blue-300 focus-glow shadow-sm"
              rows="4"
            ></textarea>
            <div class="absolute top-2 right-3 text-xs text-gray-400">
              {{ topic.length }}/500
            </div>
          </div>
        </div>

        <!-- 字数要求 -->
        <div class="group">
          <label for="wordCount" class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            {{ t('tools.essay-generator.wordCountLabel') }}
          </label>
          <div class="relative">
            <input
              id="wordCount"
              v-model.number="wordCount"
              type="number"
              min="200"
              max="5000"
              step="100"
              :placeholder="t('tools.essay-generator.wordCountPlaceholder')"
              class="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white hover:bg-gray-50 group-hover:border-blue-300 focus-glow shadow-sm"
            />
            <div class="absolute top-2 right-3 text-xs text-gray-400">
              {{ wordCount || 0 }} {{ t('tools.essay-generator.wordUnit') }}
            </div>
          </div>
          <div class="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            {{ t('tools.essay-generator.wordCountHint') }}
          </div>
        </div>

        <!-- 生成按钮 -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            @click="generateEssay"
            :disabled="!topic.trim() || isGenerating"
            class="w-auto relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl group shadow-lg"
          >
            <span v-if="isGenerating" class="flex items-center justify-center gap-3">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ t('tools.essay-generator.generatingText') }}
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              {{ t('tools.essay-generator.generateButton') }}
            </span>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
          <button
            @click="clearAll"
            class="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group bg-white shadow-sm"
          >
            {{ t('tools.essay-generator.clearButton') }}
          </button>
        </div>
      </div>

      <!-- 生成结果 -->
      <div v-if="generatedEssay" class="mt-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </span>
              {{ t('tools.essay-generator.resultTitle') }}
            </h2>
            <p class="text-gray-600 mt-1">{{ t('tools.essay-generator.resultDescription') }}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              @click="copyToClipboard"
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {{ t('tools.essay-generator.copyButton') }}
            </button>
            <button
              @click="downloadEssay"
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {{ t('tools.essay-generator.downloadButton') }}
            </button>
          </div>
        </div>
        
        <div class="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
          <div class="whitespace-pre-wrap text-gray-800 leading-relaxed text-base font-medium selection:bg-blue-200">{{ generatedEssay }}</div>
        </div>
        
        <div class="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center gap-6 text-sm text-gray-600">
            <!-- 总字数 -->
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span class="font-medium">总计</span>
              <span class="font-bold text-blue-600">{{ essayWordCount.total }}</span>
              <span>字符</span>
            </div>
            <!-- 中文字数 -->
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-red-500 rounded-full"></span>
              <span class="font-medium">汉字</span>
              <span class="font-bold text-red-600">{{ essayWordCount.chinese }}</span>
              <span>个</span>
            </div>
            <!-- 英文单词数 -->
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span class="font-medium">英文</span>
              <span class="font-bold text-green-600">{{ essayWordCount.english }}</span>
              <span>词</span>
            </div>
            <!-- 标点符号数 -->
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span class="font-medium">标点</span>
              <span class="font-bold text-purple-600">{{ essayWordCount.punctuation }}</span>
              <span>个</span>
            </div>
          </div>
          <div class="text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
            {{ t('tools.essay-generator.generatedTime') }} {{ new Date().toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 多语言支持
const { t } = useI18n()

// 响应式数据
const topic = ref('')
const wordCount = ref(1000)
const selectedModel = ref('deepseek-r1-250528')
const generatedEssay = ref('')
const isGenerating = ref(false)

// 计算生成文章的字数统计
const essayWordCount = computed(() => {
  if (!generatedEssay.value) return { total: 0, chinese: 0, english: 0, punctuation: 0 }
  
  const text = generatedEssay.value
  
  // 统计中文字符（包括中文标点）
  const chineseMatches = text.match(/[\u4e00-\u9fff]/g) || []
  const chineseCount = chineseMatches.length
  
  // 统计英文单词（连续的字母组成的单词）
  const englishMatches = text.match(/[a-zA-Z]+/g) || []
  const englishWordCount = englishMatches.length
  
  // 统计标点符号（不包括空格）
  const punctuationMatches = text.match(/[^\u4e00-\u9fff\w\s]/g) || []
  const punctuationCount = punctuationMatches.length
  
  // 总字数（中文字符 + 英文单词 + 标点符号）
  const totalCount = chineseCount + englishWordCount + punctuationCount
  
  return {
    total: totalCount,
    chinese: chineseCount,
    english: englishWordCount,
    punctuation: punctuationCount
  }
})

// 生成申论
const generateEssay = async () => {
  if (!topic.value.trim()) return
  
  isGenerating.value = true
  
  try {
    console.log('开始调用申论生成 API...')
    
    const response = await $fetch('/api/generate-essay', {
      method: 'POST',
      body: {
        topic: topic.value.trim(),
        wordCount: wordCount.value
      }
    }) as { 
      success: boolean; 
      content: string; 
      reasoning?: string;
      wordCount: number;
      generatedAt: string;
      usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
      }
    }
    
    console.log('API 响应:', response)
    
    if (response.success && response.content) {
      generatedEssay.value = response.content
      
      // 如果有深度思考内容，可以在控制台输出（可选）
      if (response.reasoning) {
        console.log('AI 思维过程:', response.reasoning)
      }
      
      // 输出 Token 使用情况
      if (response.usage) {
        console.log('Token 使用情况:', response.usage)
      }
    } else {
      throw new Error('生成内容为空')
    }
    
  } catch (error: any) {
    console.error('生成失败:', error)
    
    // 简化错误处理，因为网络错误已经在 arkClient 中处理了重试
    let errorMessage = t('tools.essay-generator.generateError')
    
    // 只处理关键的业务错误
    if (error.statusCode === 401) {
      errorMessage = 'API 密钥无效，请检查配置'
    } else if (error.statusCode === 429) {
      errorMessage = '请求过于频繁，请稍后再试'
    } else if (error.statusCode === 400) {
      errorMessage = '请求参数错误'
    } else if (error.message?.includes('网络连接') || error.message?.includes('连接超时')) {
      errorMessage = '网络连接不稳定，已尝试重试但仍然失败，请检查网络后重试'
    } else if (error.statusCode >= 500) {
      errorMessage = '服务器暂时不可用，请稍后重试'
    }
    
    alert(errorMessage)
  } finally {
    isGenerating.value = false
  }
}

// 清空所有内容
const clearAll = () => {
  topic.value = ''
  wordCount.value = 1000
  generatedEssay.value = ''
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedEssay.value)
    alert(t('tools.essay-generator.copySuccess'))
  } catch (err) {
    console.error('复制失败:', err)
    alert(t('tools.essay-generator.copyError'))
  }
}

// 下载文档
const downloadEssay = () => {
  const blob = new Blob([generatedEssay.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `申论-${topic.value.substring(0, 20)}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}

/* 优化选择文本样式 */
::selection {
  background-color: #dbeafe;
  color: #1e40af;
}

/* 添加悬浮动画 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.group:hover .float-animation {
  animation: float 2s ease-in-out infinite;
}

/* 渐变文本动画 */
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 输入框聚焦时的发光效果 */
.focus-glow:focus {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 
              0 0 20px rgba(59, 130, 246, 0.1);
}

/* 按钮悬浮时的阴影效果 */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
