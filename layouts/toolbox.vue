<template>
  <div class="toolbox-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="left-section">
          <NuxtLink to="/" class="logo">
            <span class="logo-text">Toolbox</span>
          </NuxtLink>
        </div>
        
        <div class="center-section">
          <div class="search-container">
            <div class="search-box">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search tools..." 
                class="search-input"
                v-model="searchQuery"
                @input="handleSearch"
              />
              <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="right-section">
          <nav class="nav-links">
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
            <button class="profile-btn">
              <div class="profile-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <NuxtLink to="/privacy" class="footer-link">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="footer-link">Terms</NuxtLink>
          <NuxtLink to="/help" class="footer-link">Help</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive data
const searchQuery = ref('')

// Methods
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Handle search logic here
  console.log('Searching for:', target.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<style scoped>
/* Layout Structure */
.toolbox-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

/* Header Styles */
.header {
  border-bottom: 1px solid #dadce0;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 60px;
}

/* Left Section - Logo */
.left-section {
  flex: 0 0 auto;
}

.logo {
  text-decoration: none;
  color: #202124;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.5px;
}

.logo-text {
  color: #4285f4;
  font-weight: 500;
}

/* Center Section - Search */
.center-section {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 584px;
  margin: 0 auto;
}

.search-container {
  width: 100%;
  max-width: 584px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 584px;
  height: 44px;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0 16px;
  background-color: #ffffff;
  transition: box-shadow 0.2s ease-in-out;
}

.search-box:hover {
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
}

.search-box:focus-within {
  border-color: #4285f4;
  box-shadow: 0 2px 8px 0 rgba(66,133,244,0.2);
}

.search-icon {
  color: #9aa0a6;
  margin-right: 12px;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #202124;
  background: transparent;
  font-family: inherit;
}

.search-input::placeholder {
  color: #9aa0a6;
}

.clear-btn {
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  color: #9aa0a6;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.clear-btn:hover {
  background-color: #f1f3f4;
}

/* Right Section - Navigation */
.right-section {
  flex: 0 0 auto;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #5f6368;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: #f1f3f4;
  color: #202124;
}

.profile-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-btn:hover {
  background-color: #f1f3f4;
}

.profile-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Footer */
.footer {
  border-top: 1px solid #dadce0;
  background-color: #f8f9fa;
  margin-top: auto;
}

.footer-content {
  padding: 16px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-link {
  text-decoration: none;
  color: #5f6368;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #202124;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 8px 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .center-section {
    order: 3;
    width: 100%;
    margin-top: 8px;
  }
  
  .search-box {
    max-width: none;
  }
  
  .nav-links {
    gap: 8px;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .main-content {
    padding: 20px 16px;
  }
  
  .footer-links {
    gap: 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 8px 12px;
  }
  
  .logo {
    font-size: 20px;
  }
  
  .search-input {
    font-size: 14px;
  }
  
  .main-content {
    padding: 16px 12px;
  }
}
</style>