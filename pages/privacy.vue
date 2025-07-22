<template>
  <div class="privacy-page">
    <div class="content-container">
      <h1 class="page-title">Privacy Policy</h1>
      <div class="content">
        <section>
          <h2>Information We Collect</h2>
          <p>This toolbox website operates entirely in your browser. We do not collect, store, or transmit any of your personal data or the content you process through our tools.</p>
        </section>

        <section>
          <h2>Local Processing</h2>
          <p>All tools on this website process your data locally in your browser. Your data never leaves your device:</p>
          <ul>
            <li>JSON formatting and validation</li>
            <li>Base64 encoding/decoding</li>
            <li>URL encoding/decoding</li>
            <li>Hash generation</li>
            <li>Password generation</li>
            <li>All other tools</li>
          </ul>
        </section>

        <section>
          <h2>No Data Storage</h2>
          <p>We do not store any data you input into our tools. When you refresh the page or navigate away, all your data is cleared.</p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>We may use privacy-focused analytics to understand how our tools are used, but no personal information is collected.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'toolbox',
})

useSeoMeta({
  title: 'Privacy Policy - Developer Toolbox',
  description: 'Privacy policy for Developer Toolbox - All processing happens locally in your browser.',
})
</script>

<style scoped>
.privacy-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 32px;
  font-weight: 400;
  color: #202124;
  margin-bottom: 32px;
  text-align: center;
}

.content {
  line-height: 1.6;
  color: #5f6368;
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

section {
  margin-bottom: 32px;
}

h2 {
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 16px;
}

p {
  margin-bottom: 16px;
}

ul {
  margin-left: 20px;
  margin-bottom: 16px;
}

li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .privacy-page {
    padding: 20px 16px;
  }
  
  .content {
    padding: 24px;
  }
  
  .page-title {
    font-size: 28px;
  }
}
</style>
