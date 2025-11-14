<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="main-header">
      <div class="header-content">
        <div class="logo" @click="goHome">
            建筑行业学习系统
          </div>
        <nav class="main-nav">
          <router-link to="/" class="nav-item" active-class="active">首页</router-link>
          <router-link to="/learn" class="nav-item" active-class="active">学习中心</router-link>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 使用el-card组件美化内容区域 -->
      <el-card shadow="hover" style="margin-bottom: 20px; border-radius: 12px; overflow: hidden;">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-card>
    </main>

  </div>
</template>

<script>
export default {
  name: 'App',
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
  background: white;
  line-height: 1.6;
}


.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.main-header {
  /* 半透明背景配合渐变 */
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* 导航栏滚动效果 */
.main-header:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
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
  font-size: 24px;
  font-weight: bold;
  /* 修改为蓝色系颜色 */
  color: #0066ff;
  letter-spacing: 1px;
}

.logo img {
  height: 60px;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: rotate(5deg) scale(1.1);
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
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* 导航项悬停效果 */
.nav-item:hover {
  color: #fff;
  background: linear-gradient(135deg, #0066ff 0%, #0088ff 100%);
  transform: translateY(-2px);
}

.nav-item.active {
  color: #fff;
  background: linear-gradient(135deg, #0066ff 0%, #0088ff 100%);
}

/* 添加导航项下划线动画 */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #0066ff, #0088ff);
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
  /* 内容区域添加内边距，避免紧贴边缘 */
  padding-top: 40px;
  padding-bottom: 40px;
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