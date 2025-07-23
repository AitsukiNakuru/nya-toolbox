export interface ArkMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ArkCompletionRequest {
  model: string
  messages: ArkMessage[]
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  stream?: boolean
}

export interface ArkCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
      reasoning_content?: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class ArkClient {
  private apiKey: string
  private baseURL: string
  private maxRetries: number
  private retryDelay: number

  constructor(
    apiKey: string, 
    baseURL: string = 'https://ark.cn-beijing.volces.com/api/v3',
    maxRetries: number = 3,
    retryDelay: number = 1000
  ) {
    this.apiKey = apiKey
    this.baseURL = baseURL
    this.maxRetries = maxRetries
    this.retryDelay = retryDelay
  }

  /**
   * 延迟执行
   * @param ms 延迟毫秒数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 判断是否为可重试的错误
   * @param error 错误对象
   */
  private isRetryableError(error: any): boolean {
    // 网络连接错误
    if (error.code === 'ECONNRESET' || 
        error.code === 'ENOTFOUND' || 
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT') {
      return true
    }
    
    // HTTP状态码错误
    const status = error.statusCode || error.status
    if (status === 429 || status === 500 || status === 502 || status === 503 || status === 504) {
      return true
    }
    
    // 超时错误
    if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
      return true
    }
    
    return false
  }

  /**
   * 调用聊天完成API
   * @param request 请求参数
   * @returns 响应结果
   */
  async chatCompletion(request: ArkCompletionRequest): Promise<ArkCompletionResponse> {
    let lastError: any = null
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await $fetch<ArkCompletionResponse>(`${this.baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: request,
          timeout: 60000, // 60秒超时
          retry: false // 禁用 $fetch 内置重试，使用我们自己的重试逻辑
        })
        
        return response
      } catch (error: any) {
        lastError = error
        
        console.error(`ARK API Error (attempt ${attempt + 1}/${this.maxRetries + 1}):`, {
          message: error.message,
          code: error.code,
          status: error.statusCode || error.status,
          data: error.data
        })
        
        // 如果是最后一次尝试或不是可重试的错误，直接抛出异常
        if (attempt === this.maxRetries || !this.isRetryableError(error)) {
          break
        }
        
        // 计算重试延迟（指数退避）
        const delayMs = this.retryDelay * Math.pow(2, attempt)
        console.log(`等待 ${delayMs}ms 后重试...`)
        await this.delay(delayMs)
      }
    }
    
    // 处理最终的错误
    if (lastError) {
      // 处理不同类型的错误
      if (lastError.statusCode || lastError.status) {
        const status = lastError.statusCode || lastError.status
        const errorData = lastError.data
        
        switch (status) {
          case 401:
            throw new Error('API密钥无效')
          case 429:
            throw new Error('请求过于频繁，请稍后再试')
          case 400:
            throw new Error(`请求参数错误: ${errorData?.error?.message || '未知错误'}`)
          case 500:
            throw new Error('服务器内部错误')
          default:
            throw new Error(`API调用失败 (${status}): ${errorData?.error?.message || '未知错误'}`)
        }
      } else {
        // 处理网络连接错误
        if (lastError.code === 'ECONNRESET') {
          throw new Error('网络连接被重置，请检查网络连接或稍后重试')
        } else if (lastError.code === 'ENOTFOUND') {
          throw new Error('无法解析服务器地址，请检查网络连接')
        } else if (lastError.code === 'ECONNREFUSED') {
          throw new Error('服务器拒绝连接，请检查服务器状态')
        } else if (lastError.code === 'ETIMEDOUT') {
          throw new Error('连接超时，请检查网络连接或稍后重试')
        } else {
          throw new Error(`网络错误: ${lastError.message || lastError.toString()}`)
        }
      }
    }
    
    throw new Error('未知错误')
  }

  /**
   * 简化的文本生成方法
   * @param model 模型名称
   * @param prompt 提示词
   * @param options 可选参数
   * @returns 生成的文本内容
   */
  async generateText(
    model: string, 
    prompt: string, 
    options: {
      temperature?: number
      maxTokens?: number
      systemPrompt?: string
      retries?: number
    } = {}
  ): Promise<{
    content: string
    reasoning?: string
    usage: {
      promptTokens: number
      completionTokens: number
      totalTokens: number
    }
  }> {
    const messages: ArkMessage[] = []
    
    if (options.systemPrompt) {
      messages.push({
        role: 'system',
        content: options.systemPrompt
      })
    }
    
    messages.push({
      role: 'user',
      content: prompt
    })

    const request: ArkCompletionRequest = {
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000
    }

    try {
      const response = await this.chatCompletion(request)
      
      if (!response.choices?.[0]?.message?.content) {
        throw new Error('API返回的内容为空')
      }

      return {
        content: response.choices[0].message.content,
        reasoning: response.choices[0].message.reasoning_content,
        usage: {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens
        }
      }
    } catch (error: any) {
      console.error('Generate text error:', error)
      throw error
    }
  }
}

// 创建单例实例
let arkClientInstance: ArkClient | null = null

export function createArkClient(
  apiKey: string, 
  options: {
    baseURL?: string
    maxRetries?: number
    retryDelay?: number
  } = {}
): ArkClient {
  if (!arkClientInstance) {
    arkClientInstance = new ArkClient(
      apiKey, 
      options.baseURL, 
      options.maxRetries, 
      options.retryDelay
    )
  }
  return arkClientInstance
}

// 预定义的模型常量
export const ArkModels = {
  DEEPSEEK_R1: 'deepseek-r1-250528',
  GPT_4: 'gpt-4',
  GPT_35_TURBO: 'gpt-3.5-turbo',
  CLAUDE_3_SONNET: 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU: 'claude-3-haiku-20240307',
  // 可以根据需要添加更多模型
} as const

export type ArkModelType = typeof ArkModels[keyof typeof ArkModels]
