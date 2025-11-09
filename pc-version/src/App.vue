<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="header-content">
        <div class="logo" @click="goHome">
            刘传濠的个人学习系统
          </div>
        <nav class="main-nav">
          <router-link to="/" class="nav-item" active-class="active">首页</router-link>
          <router-link to="/learn" class="nav-item" active-class="active">学习</router-link>
          <!-- <router-link to="/me" class="nav-item" active-class="active">我的</router-link> -->
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('App mounted')
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 使logo可点击 */
.logo {
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  color: #409eff;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.main-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  text-align: center;
  justify-content: center;
}

.logo img {
  height: 60px;
}

.logo h1 {
  font-size: 24px;
  color: #333;
}

.main-nav {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
  color: #5074FF;
  background-color: #f0f3ff;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
}

/* 页脚样式 */
.main-footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>