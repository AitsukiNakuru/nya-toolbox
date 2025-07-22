<template>
  <div class="help-page">
    <div class="content-container">
      <h1 class="page-title">Help & Support</h1>
      <div class="content">
        <section>
          <h2>Getting Started</h2>
          <p>Welcome to Developer Toolbox! Our tools are designed to be simple and intuitive. Just click on any tool from the homepage to get started.</p>
        </section>

        <section>
          <h2>Available Tools</h2>
          <div class="tools-help">
            <div class="tool-help-item">
              <h3>🔧 JSON Formatter</h3>
              <p>Format, validate, and prettify JSON data. Paste your JSON and click format to see it properly structured.</p>
            </div>
            <div class="tool-help-item">
              <h3>📄 Base64 Encoder</h3>
              <p>Convert text to Base64 encoding or decode Base64 back to text. Useful for data transmission and storage.</p>
            </div>
            <div class="tool-help-item">
              <h3>🔗 URL Encoder</h3>
              <p>Encode URLs for safe transmission or decode encoded URLs back to readable format.</p>
            </div>
            <div class="tool-help-item">
              <h3>🔒 Hash Generator</h3>
              <p>Generate MD5, SHA-1, or SHA-256 hashes from text. Useful for checksums and data integrity.</p>
            </div>
            <div class="tool-help-item">
              <h3>🎨 Color Picker</h3>
              <p>Pick colors and get their HEX, RGB, and HSL values for web development and design.</p>
            </div>
            <div class="tool-help-item">
              <h3>🔍 Regex Tester</h3>
              <p>Test regular expressions with live preview and match highlighting.</p>
            </div>
            <div class="tool-help-item">
              <h3>📱 QR Code Generator</h3>
              <p>Generate QR codes from text or URLs for easy sharing and mobile access.</p>
            </div>
            <div class="tool-help-item">
              <h3>⏰ Timestamp Converter</h3>
              <p>Convert between Unix timestamps and human-readable dates.</p>
            </div>
            <div class="tool-help-item">
              <h3>🛡️ Password Generator</h3>
              <p>Generate secure passwords with customizable length and character options.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Privacy & Security</h2>
          <p>All tools process data locally in your browser. Nothing is sent to our servers, ensuring your data remains private and secure.</p>
        </section>

        <section>
          <h2>Browser Compatibility</h2>
          <p>Our tools work best in modern browsers like Chrome, Firefox, Safari, and Edge. JavaScript must be enabled.</p>
        </section>

        <section>
          <h2>Need More Help?</h2>
          <p>If you encounter any issues or have suggestions for new tools, please feel free to contact us.</p>
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
  title: 'Help & Support - Developer Toolbox',
  description: 'Help and support for using Developer Toolbox tools and features.',
})
</script>

<style scoped>
.help-page {
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

h3 {
  font-size: 16px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 8px;
}

p {
  margin-bottom: 16px;
}

.tools-help {
  display: grid;
  gap: 20px;
}

.tool-help-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #4285f4;
}

.tool-help-item h3 {
  margin-bottom: 8px;
}

.tool-help-item p {
  margin-bottom: 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .help-page {
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
