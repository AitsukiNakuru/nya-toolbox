// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  pages: true,
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // 服务器端私有配置
    arkApiKey: process.env.ARK_API_KEY,
    // 客户端公开配置
    public: {}
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      global: true
    }
  ],
  i18n: {
    locales: [
      {
        code: 'en-US',
        name: 'English',
        file: 'en-US.json'
      },
      {
        code: 'zh-CN',
        name: '中文',
        file: 'zh-CN.json'
      }
    ],
    defaultLocale: 'zh-CN',
    langDir: './locales/',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    
  }
})