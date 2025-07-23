// plugins/auto-import-tools.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Get all component modules using import.meta.glob
  const toolComponents = import.meta.glob('~/components/tools/*.vue', { eager: true })
  
  // Register each component globally
  for (const path in toolComponents) {
    const component = (toolComponents[path] as any).default
    const componentName = path.split('/').pop()?.replace('.vue', '') || ''
    
    if (componentName && component) {
      // 确保组件名称大小写一致，使用 PascalCase
      const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
      nuxtApp.vueApp.component(pascalCaseName, component)
    }
  }
})
