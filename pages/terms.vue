<template>
  <div class="terms-page">
    <div class="content-container">
      <h1 class="page-title">Terms of Service</h1>
      <div class="content">
        <section>
          <h2>Acceptance of Terms</h2>
          <p>By using this Developer Toolbox website, you agree to these terms of service.</p>
        </section>

        <section>
          <h2>Use of Tools</h2>
          <p>Our tools are provided free of charge for personal and commercial use. You may:</p>
          <ul>
            <li>Use all tools for any legal purpose</li>
            <li>Process your data through our tools</li>
            <li>Share links to our tools</li>
          </ul>
        </section>

        <section>
          <h2>Limitations</h2>
          <p>While we strive to provide accurate and reliable tools:</p>
          <ul>
            <li>Tools are provided "as is" without warranty</li>
            <li>We are not responsible for any data loss or damage</li>
            <li>Always verify critical results independently</li>
          </ul>
        </section>

        <section>
          <h2>Availability</h2>
          <p>We aim to keep our tools available 24/7, but we do not guarantee uninterrupted service. We may update or modify tools at any time.</p>
        </section>

        <section>
          <h2>Prohibited Uses</h2>
          <p>You may not:</p>
          <ul>
            <li>Attempt to overwhelm our servers</li>
            <li>Use tools for illegal activities</li>
            <li>Reverse engineer our code without permission</li>
          </ul>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>We may update these terms occasionally. Continued use of the site constitutes acceptance of updated terms.</p>
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
  title: 'Terms of Service - Developer Toolbox',
  description: 'Terms of service for Developer Toolbox website and tools.',
})
</script>

<style scoped>
.terms-page {
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
  .terms-page {
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
