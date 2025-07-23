<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold animate-gradient mb-3">
          📝 智能申论生成器
        </h1>
        <p class="text-gray-600 text-lg">高效生成高质量申论文章，助力公考备考</p>
      </div>

      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <!-- 输入区域 -->
        <div class="space-y-8">
          <!-- 题目输入 -->
          <div class="group">
            <label for="topic" class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
              申论题目 
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <textarea
                id="topic"
                v-model="topic"
                placeholder="请输入申论题目或材料概述，例如：关于推进数字化转型的思考..."
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none bg-gray-50/50 hover:bg-white group-hover:border-blue-300 focus-glow"
                rows="4"
              ></textarea>
              <div class="absolute top-2 right-3 text-xs text-gray-400">
                {{ topic.length }}/500
              </div>
            </div>
          </div>

          <!-- 要求选择 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              申论类型
            </label>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                v-for="type in essayTypes"
                :key="type.id"
                @click="selectedType = type.id"
                :class="[
                  'group relative p-4 border-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover-lift',
                  selectedType === type.id
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-lg shadow-blue-500/25'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                ]"
              >
                <div class="flex items-center justify-center gap-2">
                  <span :class="selectedType === type.id ? 'text-blue-600' : 'text-gray-500'">
                    {{ type.icon }}
                  </span>
                  {{ type.name }}
                </div>
                <div v-if="selectedType === type.id" class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- 字数要求 -->
          <div class="group">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              字数要求
            </label>
            <div class="relative">
              <select
                v-model="wordCount"
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white appearance-none cursor-pointer focus-glow"
              >
                <option value="800">📏 800字左右 (简洁版)</option>
                <option value="1000">📄 1000字左右 (标准版)</option>
                <option value="1200">📋 1200字左右 (详细版)</option>
                <option value="1500">📚 1500字左右 (完整版)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- 生成按钮 -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              @click="generateEssay"
              :disabled="!topic.trim() || isGenerating"
              class="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
            >
              <span v-if="isGenerating" class="flex items-center justify-center gap-3">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI正在生成中...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                🚀 生成申论
              </span>
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            <button
              @click="clearAll"
              class="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <svg class="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              清空重置
            </button>
          </div>
        </div>

        <!-- 生成结果 -->
        <div v-if="generatedEssay" class="mt-12 pt-8 border-t-2 border-gray-100">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                生成完成
              </h2>
              <p class="text-gray-600 mt-1">您的申论文章已生成完成，请查看并使用</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                @click="copyToClipboard"
                class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                📋 复制内容
              </button>
              <button
                @click="downloadEssay"
                class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                💾 下载文档
              </button>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-gray-50 to-blue-50/30 border-2 border-gray-200 rounded-2xl p-8 shadow-inner">
            <div class="whitespace-pre-wrap text-gray-800 leading-relaxed text-base font-medium selection:bg-blue-200">{{ generatedEssay }}</div>
          </div>
          
          <div class="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-center gap-6 text-sm text-gray-600">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span class="font-medium">字数统计:</span>
                <span class="font-bold text-blue-600">{{ essayWordCount }}</span>
                <span>字</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="font-medium">类型:</span>
                <span class="font-bold text-green-600">{{ essayTypes.find(t => t.id === selectedType)?.name }}</span>
              </div>
            </div>
            <div class="text-xs text-gray-500 flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              生成时间: {{ new Date().toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 响应式数据
const topic = ref('')
const selectedType = ref('analysis')
const wordCount = ref('1000')
const generatedEssay = ref('')
const isGenerating = ref(false)

// 申论类型
const essayTypes = [
  { id: 'analysis', name: '分析论证', icon: '🔍' },
  { id: 'countermeasure', name: '对策建议', icon: '💡' },
  { id: 'implementation', name: '贯彻执行', icon: '⚡' },
  { id: 'comprehensive', name: '综合分析', icon: '📊' }
]

// 计算生成文章的字数
const essayWordCount = computed(() => {
  return generatedEssay.value.replace(/\s/g, '').length
})

// 生成申论
const generateEssay = async () => {
  if (!topic.value.trim()) return
  
  isGenerating.value = true
  
  try {
    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const typeTemplates = {
      analysis: generateAnalysisEssay,
      countermeasure: generateCountermeasureEssay,
      implementation: generateImplementationEssay,
      comprehensive: generateComprehensiveEssay
    }
    
    const generator = typeTemplates[selectedType.value as keyof typeof typeTemplates]
    generatedEssay.value = generator(topic.value, parseInt(wordCount.value))
    
  } catch (error) {
    console.error('生成失败:', error)
  } finally {
    isGenerating.value = false
  }
}

// 分析论证类申论生成
const generateAnalysisEssay = (topic: string, words: number) => {
  return `${topic}

一、问题分析

${topic}所反映的问题具有深层次的社会背景和复杂的成因。从表面现象来看，这一问题的出现并非偶然，而是多重因素共同作用的结果。

首先，从制度层面分析，相关制度的不完善或执行不到位是导致问题产生的重要原因。制度的缺失或漏洞为问题的滋生提供了土壤，使得一些不良现象得以蔓延。

其次，从管理层面来看，监管机制的不健全、责任落实不到位等因素也加剧了问题的严重性。缺乏有效的监督和约束机制，使得问题难以得到及时发现和有效解决。

再次，从社会层面分析，公众意识的淡薄、参与度不高等因素也是不可忽视的原因。社会各界对此类问题的关注度不够，缺乏有效的社会监督和舆论引导。

二、深层原因

通过深入分析，我们可以发现问题的根本原因在于：

1. 体制机制不完善。现有的管理体制和运行机制存在缺陷，无法适应新形势下的发展要求。

2. 法律法规不健全。相关法律条文存在空白或滞后，执法标准不统一，处罚力度不够。

3. 责任主体不明确。各部门职责界限模糊，协调配合不够，形成管理真空。

4. 监督机制不到位。缺乏有效的内外部监督机制，问题发现不及时，处置不果断。

三、对策建议

针对以上分析，提出如下对策建议：

第一，完善制度体系。建立健全相关制度规范，明确各方责任和义务，形成系统完备的制度体系。

第二，强化监管力度。加大执法检查力度，严格按照法律法规执行，确保各项措施落到实处。

第三，创新管理方式。运用现代科技手段，提高管理效率和水平，实现精准管理和智能监督。

第四，加强宣传教育。提高公众认识，增强社会责任感，形成全社会共同参与的良好氛围。

四、结语

解决${topic}相关问题需要政府、社会和个人的共同努力。只有通过系统性的改革和持续性的努力，才能从根本上解决问题，实现长期稳定发展。我们要以高度的责任感和使命感，扎实推进各项工作，为构建和谐社会贡献力量。`
}

// 对策建议类申论生成
const generateCountermeasureEssay = (topic: string, words: number) => {
  return `关于${topic}的对策建议

一、问题概述

${topic}是当前社会发展中面临的重要问题，其解决程度直接关系到人民群众的切身利益和社会的和谐稳定。面对这一挑战，我们必须采取有效措施，统筹规划，精准施策。

二、具体对策

（一）加强顶层设计，完善政策体系

1. 制定专项规划。结合实际情况，制定针对性强的专项规划，明确发展目标、重点任务和保障措施。

2. 完善政策法规。梳理现有政策法规，填补空白，修订完善，形成系统完备的政策法规体系。

3. 建立协调机制。成立专门的协调机构，统筹各部门力量，形成工作合力。

（二）强化组织保障，明确责任主体

1. 明确责任分工。按照"谁主管、谁负责"的原则，明确各级各部门职责，建立责任清单。

2. 完善考核机制。将相关工作纳入绩效考核体系，实行目标管理，强化结果导向。

3. 建立督查制度。定期开展督查检查，及时发现问题，推动工作落实。

（三）加大投入力度，提供资金保障

1. 设立专项资金。在财政预算中设立专项资金，确保工作顺利开展。

2. 拓宽融资渠道。鼓励社会资本参与，形成多元化投入格局。

3. 提高资金使用效益。建立资金监管机制，确保专款专用，提高使用效率。

（四）创新工作方式，提升工作效能

1. 运用科技手段。充分利用大数据、人工智能等现代技术，提高工作精准度和效率。

2. 推广典型经验。总结推广先进经验和做法，发挥示范引领作用。

3. 加强国际合作。学习借鉴国外先进经验，提升工作水平。

三、保障措施

（一）加强组织领导
各级政府要高度重视，加强组织领导，确保各项措施落到实处。

（二）强化人才支撑
加强人才队伍建设，提高专业素养和工作能力。

（三）营造良好氛围
加强宣传引导，提高社会认知度和参与度。

四、结语

解决${topic}问题是一项系统工程，需要全社会的共同努力。我们要以求真务实的态度，扎实推进各项工作，确保取得实效，让人民群众有更多获得感、幸福感、安全感。`
}

// 贯彻执行类申论生成
const generateImplementationEssay = (topic: string, words: number) => {
  return `关于贯彻执行${topic}的实施方案

为认真贯彻落实${topic}相关要求，结合我地区实际情况，制定本实施方案。

一、总体要求

（一）指导思想
以习近平新时代中国特色社会主义思想为指导，全面贯彻党的二十大精神，坚持以人民为中心的发展思想，统筹推进${topic}相关工作。

（二）基本原则
1. 坚持统筹规划，系统推进
2. 坚持问题导向，精准施策
3. 坚持改革创新，提质增效
4. 坚持依法依规，规范运作

（三）主要目标
通过三年努力，基本建立健全相关制度体系，工作机制更加完善，工作效能显著提升，人民群众满意度明显提高。

二、主要任务

（一）完善工作机制
1. 建立联席会议制度。由政府分管领导担任召集人，相关部门参与，定期研究解决重大问题。
2. 建立信息共享机制。打破部门壁垒，实现信息互通共享。
3. 建立协调配合机制。明确部门职责，加强沟通协调。

（二）强化制度建设
1. 完善管理制度。制定完善相关管理办法和操作规程。
2. 建立监督制度。完善内部监督和外部监督相结合的监督体系。
3. 健全评价制度。建立科学的评价指标体系和评价方法。

（三）加强队伍建设
1. 配强工作力量。充实专业人员，优化人员结构。
2. 提升专业能力。加强业务培训，提高专业素养。
3. 完善激励机制。建立健全激励约束机制，调动工作积极性。

三、实施步骤

（一）动员部署阶段（第一个月）
1. 制定实施方案，明确工作任务和时间节点。
2. 召开动员大会，统一思想认识。
3. 建立工作机制，明确责任分工。

（二）全面实施阶段（第二个月至第二年）
1. 分步骤推进各项任务落实。
2. 定期开展督查检查，及时发现解决问题。
3. 总结推广典型经验做法。

（三）总结提升阶段（第三年）
1. 全面总结工作成效和经验教训。
2. 完善长效机制，巩固工作成果。
3. 研究下一步工作思路和措施。

四、保障措施

（一）加强组织领导
成立工作领导小组，统筹协调推进各项工作。各成员单位要高度重视，主要负责人亲自抓，分管负责人具体抓。

（二）强化资金保障
将相关工作经费纳入财政预算，确保工作顺利开展。同时，积极争取上级资金支持，拓宽资金来源渠道。

（三）完善督查机制
建立定期督查制度，对工作进展情况进行跟踪督查。对工作不力、进展缓慢的单位和个人，要严肃问责。

（四）加强宣传引导
充分利用各种媒体，广泛宣传工作的重要意义和具体措施，营造良好的社会氛围。

五、工作要求

各相关部门要充分认识做好此项工作的重要性和紧迫性，切实增强责任感和使命感，以高度负责的态度，扎实做好各项工作，确保取得实效。`
}

// 综合分析类申论生成
const generateComprehensiveEssay = (topic: string, words: number) => {
  return `${topic}的综合分析

${topic}作为当前社会关注的热点问题，具有重要的现实意义和深远的历史影响。深入分析这一问题的内在逻辑和发展趋势，对于我们正确认识形势、科学决策具有重要价值。

一、现状分析

当前，${topic}呈现出以下特点：

第一，发展态势总体向好。通过各方面的共同努力，相关工作取得了阶段性成果，整体呈现稳中向好的发展态势。

第二，区域差异明显。不同地区由于经济发展水平、资源禀赋、政策环境等因素的差异，在相关方面表现出明显的区域差异。

第三，结构性问题突出。在发展过程中，一些结构性、深层次问题逐渐显现，需要引起高度关注。

第四，发展动力有待增强。传统发展模式面临挑战，新的发展动力有待培育和激发。

二、问题剖析

通过深入调研和分析，当前存在的主要问题包括：

（一）体制机制不够完善
现有的体制机制在一定程度上制约了发展，需要进一步深化改革，破除体制机制障碍。

（二）资源配置不够合理
资源配置效率有待提高，存在配置不均衡、利用不充分等问题。

（三）创新能力不够强
创新驱动发展的作用尚未充分发挥，创新能力和水平有待进一步提升。

（四）协调发展不够充分
各领域、各环节之间的协调发展水平有待提高，统筹协调机制需要进一步完善。

三、原因分析

造成上述问题的原因是多方面的：

一是历史因素。长期形成的发展模式和思维定势对当前发展产生了一定影响。

二是现实因素。当前面临的发展环境和条件与过去相比发生了深刻变化，需要适应新形势新要求。

三是主观因素。认识不到位、措施不得力、执行不到位等主观因素也是重要原因。

四是客观因素。资源约束、环境压力、技术瓶颈等客观因素也对发展产生了制约作用。

四、发展趋势

从发展趋势来看，${topic}具有以下特点：

第一，发展前景广阔。随着各种有利因素的不断积累，未来发展前景十分广阔。

第二，发展要求更高。新时代对发展质量和效益提出了更高要求，粗放式发展模式已不可持续。

第三，发展路径更加多元。发展路径和模式呈现多元化趋势，需要因地制宜选择适合的发展路径。

第四，发展环境更加复杂。面临的内外部环境更加复杂多变，不确定性因素增多。

五、对策建议

基于以上分析，提出以下对策建议：

（一）深化改革创新
继续深化相关领域改革，破除制约发展的体制机制障碍，激发发展活力和动力。

（二）优化资源配置
完善资源配置机制，提高配置效率，实现资源的优化配置和合理利用。

（三）加强统筹协调
建立健全统筹协调机制，加强各部门、各地区之间的协调配合，形成发展合力。

（四）强化政策支持
完善政策体系，加大政策支持力度，为发展提供有力的政策保障。

六、结论

${topic}是一个复杂的系统工程，需要统筹考虑各种因素，科学规划，精准施策。我们要以改革创新为动力，以协调发展为主线，以提质增效为目标，扎实推进各项工作，努力开创发展新局面。只有这样，才能实现高质量发展，满足人民群众对美好生活的向往。`
}

// 清空所有内容
const clearAll = () => {
  topic.value = ''
  selectedType.value = 'analysis'
  wordCount.value = '1000'
  generatedEssay.value = ''
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedEssay.value)
    alert('内容已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败，请手动复制')
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
