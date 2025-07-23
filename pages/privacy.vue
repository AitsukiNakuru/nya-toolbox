<template>
  <div class="max-w-4xl mx-auto py-10 px-5">
    <div class="bg-white rounded-lg p-10 shadow-lg">
      <h1 class="text-3xl font-normal text-gray-900 mb-8 text-center">{{ $t('pages.privacy.title') }}</h1>
      <div class="text-base leading-relaxed text-gray-700 space-y-6">
        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.privacy.commitment.title') }}</h2>
          <p>{{ $t('pages.privacy.commitment.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.privacy.dataProcessing.title') }}</h2>
          <p>{{ $t('pages.privacy.dataProcessing.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.privacy.noDataCollection.title') }}</h2>
          <p>{{ $t('pages.privacy.noDataCollection.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.privacy.thirdParty.title') }}</h2>
          <p>{{ $t('pages.privacy.thirdParty.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.privacy.contact.title') }}</h2>
          <p>
            {{ $t('pages.privacy.contact.content') }}
            <a href="mailto:privacy@example.com" class="text-google-blue hover:text-google-blue-dark">privacy@example.com</a>。
          </p>
        </section>

        <section>
          <p class="text-sm text-gray-500">{{ $t('pages.privacy.lastUpdated') }}</p>
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
