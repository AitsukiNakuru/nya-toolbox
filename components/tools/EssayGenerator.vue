<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">申论生成器</h1>
      
      <!-- 输入区域 -->
      <div class="space-y-6">
        <!-- 题目输入 -->
        <div>
          <label for="topic" class="block text-sm font-medium text-gray-700 mb-2">
            申论题目 *
          </label>
          <textarea
            id="topic"
            v-model="topic"
            placeholder="请输入申论题目或材料概述..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          ></textarea>
        </div>

        <!-- 要求选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            申论类型
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              v-for="type in essayTypes"
              :key="type.id"
              @click="selectedType = type.id"
              :class="[
                'p-3 border rounded-lg text-sm font-medium transition-all',
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-blue-300'
              ]"
            >
              {{ type.name }}
            </button>
          </div>
        </div>

        <!-- 字数要求 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            字数要求
          </label>
          <select
            v-model="wordCount"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="800">800字左右</option>
            <option value="1000">1000字左右</option>
            <option value="1200">1200字左右</option>
            <option value="1500">1500字左右</option>
          </select>
        </div>

        <!-- 生成按钮 -->
        <div class="flex gap-3">
          <button
            @click="generateEssay"
            :disabled="!topic.trim() || isGenerating"
            class="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="isGenerating">生成中...</span>
            <span v-else>生成申论</span>
          </button>
          <button
            @click="clearAll"
            class="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            清空
          </button>
        </div>
      </div>

      <!-- 生成结果 -->
      <div v-if="generatedEssay" class="mt-8 border-t pt-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">生成的申论</h2>
          <div class="flex gap-2">
            <button
              @click="copyToClipboard"
              class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              复制内容
            </button>
            <button
              @click="downloadEssay"
              class="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              下载文档
            </button>
          </div>
        </div>
        
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div class="whitespace-pre-wrap text-gray-800 leading-relaxed">{{ generatedEssay }}</div>
        </div>
        
        <div class="mt-4 text-sm text-gray-600">
          字数统计: {{ essayWordCount }} 字
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
  { id: 'analysis', name: '分析论证' },
  { id: 'countermeasure', name: '对策建议' },
  { id: 'implementation', name: '贯彻执行' },
  { id: 'comprehensive', name: '综合分析' }
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
</style>
