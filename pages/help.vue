<template>
  <div class="max-w-4xl mx-auto py-10 px-5">
    <div class="bg-white rounded-lg p-10 shadow-lg">
      <h1 class="text-3xl font-normal text-gray-900 mb-8 text-center">{{ $t('pages.help.title') }}</h1>
      <div class="text-base leading-relaxed text-gray-700">
        <section class="mb-8">
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.help.gettingStarted.title') }}</h2>
          <p>{{ $t('pages.help.gettingStarted.content') }}</p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.help.faq.title') }}</h2>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">{{ $t('pages.help.faq.dataSafety.question') }}</h4>
              <p class="text-gray-600">{{ $t('pages.help.faq.dataSafety.answer') }}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">{{ $t('pages.help.faq.accountRequired.question') }}</h4>
              <p class="text-gray-600">{{ $t('pages.help.faq.accountRequired.answer') }}</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">{{ $t('pages.help.faq.offlineUsage.question') }}</h4>
              <p class="text-gray-600">{{ $t('pages.help.faq.offlineUsage.answer') }}</p>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.help.contactSupport.title') }}</h2>
          <p class="text-gray-600">
            {{ $t('pages.help.contactSupport.content') }}
            <a href="mailto:support@example.com" class="text-google-blue hover:text-google-blue-dark">{{ $t('pages.help.contactSupport.emailLink') }}</a>。
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'toolbox',
})
</script>

<style scoped>

</style>
