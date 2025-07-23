import { createArkClient, ArkModels } from '../utils/arkClient'

export default defineEventHandler(async (event) => {
  // 只允许 POST 请求
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  const config = useRuntimeConfig()
  let body
  
  try {
    body = await readBody(event)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }
  
  const { topic, essayType = 'comprehensive', wordCount = 1000 } = body
  
  if (!topic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Topic is required'
    })
  }

  const arkApiKey = config.arkApiKey || process.env.ARK_API_KEY
  
  if (!arkApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ARK_API_KEY not configured'
    })
  }

  // 根据申论类型构建不同的提示词
  const typePrompts: Record<string, string> = {
    analysis: '分析论证类申论',
    countermeasure: '对策建议类申论',
    implementation: '贯彻执行类申论',
    comprehensive: '综合分析类申论'
  }

  const typeInstructions: Record<string, string> = {
    analysis: '请深入分析问题的原因、影响和内在逻辑，提出分析论证',
    countermeasure: '请针对问题提出具体可行的对策建议和解决方案',
    implementation: '请制定详细的实施方案和贯彻执行措施',
    comprehensive: '请进行全面的综合分析，包括现状、问题、原因和对策'
  }

  const prompt = `请你以一名专业公务员的身份，针对"${topic}"这个主题，写一篇看起来像申论的文章。

要求：
1. 字数约${wordCount}字，严格控制误差不超过50字
2. 内容不需要有深度，随意编造，用大量的申论句式堆砌即可，越空泛越好，需要对${topic}保持肯定的态度，不需考虑常理
3. 回复的内容只需要包含标题和文章内容，以纯文本形式回复，每段开头空两格
`

  try {
    // 创建 ARK 客户端
    const arkClient = createArkClient(arkApiKey)
    
    // 使用新的 ARK 客户端生成文本
    const result = await arkClient.generateText(
      ArkModels.DEEPSEEK_R1, // 使用预定义的模型
      prompt,
      {
        temperature: 0.7,
        maxTokens: Math.max(parseInt(wordCount) * 1.5, 2000)
      }
    )

    return {
      success: true,
      content: result.content,
      reasoning: result.reasoning,
      wordCount: result.content.replace(/\s/g, '').length,
      generatedAt: new Date().toISOString(),
      usage: result.usage // 返回 token 使用情况
    }

  } catch (error: any) {
    console.error('ARK API Error:', error)
    
    // 使用新的错误处理
    let errorMessage = 'Failed to generate essay'
    
    if (error.message.includes('API密钥无效')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid API key'
      })
    } else if (error.message.includes('请求过于频繁')) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Rate limit exceeded, please try again later'
      })
    } else if (error.message.includes('请求参数错误')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request parameters'
      })
    } else if (error.message.includes('服务器内部错误')) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || errorMessage
    })
  }
})
