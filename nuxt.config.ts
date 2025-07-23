// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  pages: true,
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
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