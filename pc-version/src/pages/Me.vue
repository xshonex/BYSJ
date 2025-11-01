<template>
  <div class="me-page">
    <!-- 用户信息区域 -->
    <div class="user-info-section">
      <div class="user-info">
        <div class="avatar">
          <img :src="pic" alt="用户头像" class="avatar-image">
        </div>
        <div class="user-details">
          <h3 class="user-name">刘传濠</h3>
          <div class="vip-status" @click="goVip">会员已开启</div>
        </div>
        <button class="profile-btn" @click="goProfile">个人资料</button>
      </div>
    </div>

    <!-- 会员广告区域 -->
    <div class="vip-ad-section">
      <div class="vip-ad">
        <img src="@static/images/me/会员图标.png" alt="会员" class="vip-icon">
        <div class="vip-text">全站海量视频无线学习</div>
        <button class="vip-btn" @click="goVip">去开通</button>
      </div>
    </div>

    <!-- 功能菜单区域 -->
    <div class="menu-section">
      <div class="menu-grid">
        <div class="menu-item" @click="goMessage">
          <img src="@static/images/me/消息中心.png" alt="消息中心">
          <span>消息中心</span>
        </div>
        <div class="menu-item" @click="goOrder">
          <img src="@static/images/me/我的订单.png" alt="我的订单">
          <span>我的订单</span>
        </div>
        <div class="menu-item" @click="goMyCourse">
          <img src="@static/images/me/我的课程.png" alt="我的课程">
          <span>我的课程</span>
        </div>
        <div class="menu-item" @click="goFavorite">
          <img src="@static/images/me/我的收藏.png" alt="我的收藏">
          <span>我的收藏</span>
        </div>
      </div>
    </div>

    <!-- 轮播图区域 -->
    <div class="banner-section">
      <div class="banner-swiper">
        <img 
          v-for="(item, index) in swiperList" 
          :key="index"
          :src="item.url" 
          :alt="Banner"
          class="banner-image"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data() {
    return {
      pic: '@static/images/me/头像.png',
      swiperList: [
        { url: '@static/images/me/小banner.png' }
      ]
    }
  },
  methods: {
    goProfile() {
      // 跳转到个人资料页面
      console.log('跳转到个人资料页面')
    },
    goVip() {
      // 跳转到会员页面
      console.log('跳转到会员页面')
    },
    goMessage() {
      // 跳转到消息中心
      console.log('跳转到消息中心')
    },
    goOrder() {
      // 跳转到订单页面
      console.log('跳转到订单页面')
    },
    goMyCourse() {
      // 跳转到我的课程
      this.$router.push('/learn')
    },
    goFavorite() {
      // 跳转到收藏页面
      console.log('跳转到收藏页面')
    }
  }
}
</script>

<style scoped>
.me-page {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 用户信息区域 */
.user-info-section {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 30px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.vip-status {
  font-size: 16px;
  color: #5074FF;
  cursor: pointer;
  display: inline-block;
  padding: 4px 12px;
  background-color: #f0f3ff;
  border-radius: 4px;
}

.profile-btn {
  padding: 10px 24px;
  background-color: #5074FF;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.profile-btn:hover {
  background-color: #405ecb;
}

/* 会员广告区域 */
.vip-ad-section {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.vip-ad {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: url('/src/assets/images/me/bg.png') 100% no-repeat;
  background-size: contain;
}

.vip-icon {
  width: 40px;
  height: 40px;
}

.vip-text {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #604320;
}

.vip-btn {
  padding: 8px 20px;
  background-color: #5074FF;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.vip-btn:hover {
  background-color: #405ecb;
}

/* 功能菜单区域 */
.menu-section {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-4px);
}

.menu-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-item span {
  font-size: 16px;
  color: #666;
}

/* 轮播图区域 */
.banner-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.banner-swiper {
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
    text-align: center;
  }
  
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .vip-ad {
    flex-direction: column;
    text-align: center;
    background: none;
  }
}
</style>