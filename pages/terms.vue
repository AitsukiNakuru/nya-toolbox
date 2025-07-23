<template>
  <div class="max-w-4xl mx-auto py-10 px-5">
    <div class="bg-white rounded-lg p-10 shadow-lg">
      <h1 class="text-3xl font-normal text-gray-900 mb-8 text-center">{{ $t('pages.terms.title') }}</h1>
      <div class="text-base leading-relaxed text-gray-700 space-y-6">
        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.terms.acceptance.title') }}</h2>
          <p>{{ $t('pages.terms.acceptance.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.terms.license.title') }}</h2>
          <p>{{ $t('pages.terms.license.content') }}</p>
          <ul class="list-disc list-inside ml-4 space-y-2 text-gray-600">
            <li v-for="restriction in $t('pages.terms.license.restrictions')" :key="restriction">{{ restriction }}</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.terms.disclaimer.title') }}</h2>
          <p>{{ $t('pages.terms.disclaimer.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.terms.limitations.title') }}</h2>
          <p>{{ $t('pages.terms.limitations.content') }}</p>
        </section>

        <section>
          <h2 class="text-xl font-medium text-gray-900 mb-4">{{ $t('pages.terms.modifications.title') }}</h2>
          <p>{{ $t('pages.terms.modifications.content') }}</p>
        </section>

        <section>
          <p class="text-sm text-gray-500">{{ $t('pages.terms.lastUpdated') }}</p>
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
