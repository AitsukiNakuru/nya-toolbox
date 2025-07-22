<template>
  <div class="about-page">
    <div class="about-container">
      <h1 class="about-title">About Developer Toolbox</h1>
      
      <div class="about-content">
        <section class="about-section">
          <h2>What is Developer Toolbox?</h2>
          <p>
            Developer Toolbox is a comprehensive collection of essential web development tools, 
            designed with a clean, Google-inspired interface. Our mission is to provide developers 
            with quick access to commonly needed utilities without the clutter.
          </p>
        </section>

        <section class="about-section">
          <h2>Why We Built This</h2>
          <p>
            As developers, we often find ourselves searching for simple tools to format JSON, 
            encode Base64, generate hashes, or test regex patterns. Instead of bookmarking 
            multiple websites, we created a single, unified platform that houses all these 
            essential tools.
          </p>
        </section>

        <section class="about-section">
          <h2>Features</h2>
          <ul class="features-list">
            <li>Clean, Google-inspired design</li>
            <li>Fast and responsive interface</li>
            <li>No registration required</li>
            <li>Works offline (once loaded)</li>
            <li>Privacy-focused (no data stored)</li>
            <li>Mobile-friendly</li>
          </ul>
        </section>

        <section class="about-section">
          <h2>Privacy & Security</h2>
          <p>
            All operations are performed client-side in your browser. We don't store, 
            track, or transmit any of your data. Your information stays private and secure.
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
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.about-container {
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-title {
  font-size: 32px;
  font-weight: 400;
  color: #202124;
  margin: 0 0 32px;
  text-align: center;
}

.about-content {
  font-size: 16px;
  line-height: 1.6;
  color: #3c4043;
}

.about-section {
  margin-bottom: 32px;
}

.about-section h2 {
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 16px;
}

.about-section p {
  margin: 0 0 16px;
}

.features-list {
  margin: 0;
  padding-left: 20px;
}

.features-list li {
  margin-bottom: 8px;
  color: #5f6368;
}

@media (max-width: 768px) {
  .about-page {
    padding: 20px 16px;
  }
  
  .about-container {
    padding: 24px;
  }
  
  .about-title {
    font-size: 28px;
  }
}
</style>