<template>
  <div class="home-page">
    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="建筑设计公开课" 
          v-model="keyword"
          class="search-input"
        >
        <button class="search-btn" @click="goSearch">搜索</button>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="tabs-container">
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabList" 
          :key="index"
          :class="['tab', { active: current === index }]"
          @click="changeTab(index)"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 标签内容 -->
      <div class="tab-content">
        <!-- 建筑设计 -->
        <div v-show="current === 0" class="tab-pane">
          <div class="banner-section">
            <div class="banner-swiper">
              <img 
                v-for="(item, index) in swiperList1" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
              >
            </div>
          </div>

          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in courseList1" 
                :key="index"
                class="course-card"
                @click="goCourse(1, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image">
                <h4 class="course-title">{{ item.title }}</h4>
                <span class="course-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 结构设计 -->
        <div v-show="current === 1" class="tab-pane">
          <div class="banner-section">
            <div class="banner-swiper">
              <img 
                v-for="(item, index) in swiperList2" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
              >
            </div>
          </div>

          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in courseList2" 
                :key="index"
                class="course-card"
                @click="goCourse(2, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image">
                <h4 class="course-title">{{ item.title }}</h4>
                <span class="course-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 给排水设计 -->
        <div v-show="current === 2" class="tab-pane">
          <div class="banner-section">
            <div class="banner-swiper">
              <img 
                v-for="(item, index) in swiperList3" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
              >
            </div>
          </div>

          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in courseList3" 
                :key="index"
                class="course-card"
                @click="goCourse(3, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image">
                <h4 class="course-title">{{ item.title }}</h4>
                <span class="course-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 暖通设计 -->
        <div v-show="current === 3" class="tab-pane">
          <div class="banner-section">
            <div class="banner-swiper">
              <img 
                v-for="(item, index) in swiperList4" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
              >
            </div>
          </div>

          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in courseList4" 
                :key="index"
                class="course-card"
                @click="goCourse(4, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image">
                <h4 class="course-title">{{ item.title }}</h4>
                <span class="course-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 电气设计 -->
        <div v-show="current === 4" class="tab-pane">
          <div class="banner-section">
            <div class="banner-swiper">
              <img 
                v-for="(item, index) in swiperList5" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
              >
            </div>
          </div>

          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in courseList5" 
                :key="index"
                class="course-card"
                @click="goCourse(5, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image">
                <h4 class="course-title">{{ item.title }}</h4>
                <span class="course-tag">{{ item.tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      keyword: '',
      current: 0,
      tabList: [
        { name: '建筑设计' },
        { name: '结构设计' },
        { name: '给排水设计' },
        { name: '暖通设计' },
        { name: '电气设计' }
      ],
      // 轮播图数据（使用原始项目图片）
      swiperList1: [
        { image: '@static/images/index/建筑设计推广1.jpg', text: '建筑设计推广1' },
        { image: '@static/images/index/建筑设计推广2.jpg', text: '建筑设计推广2' },
        { image: '@static/images/index/建筑设计推广3.jpg', text: '建筑设计推广3' }
      ],
      swiperList2: [
        { image: '@static/images/index/结构设计推广1.jpg', text: '结构设计推广1' },
        { image: '@static/images/index/结构设计推广2.jpg', text: '结构设计推广2' },
        { image: '@static/images/index/结构设计推广3.jpg', text: '结构设计推广3' }
      ],
      swiperList3: [
        { image: '@static/images/index/给排水设计推广1.jpg', text: '给排水设计推广1' },
        { image: '@static/images/index/给排水设计推广2.jpg', text: '给排水设计推广2' },
        { image: '@static/images/index/给排水设计推广3.jpg', text: '给排水设计推广3' }
      ],
      swiperList4: [
        { image: '@static/images/index/暖通设计推广1.jpg', text: '暖通设计推广1' },
        { image: '@static/images/index/暖通设计推广2.jpg', text: '暖通设计推广2' },
        { image: '@static/images/index/暖通设计推广3.jpg', text: '暖通设计推广3' }
      ],
      swiperList5: [
        { image: '@static/images/index/电气设计推广1.jpg', text: '电气设计推广1' },
        { image: '@static/images/index/电气设计推广2.jpg', text: '电气设计推广2' },
        { image: '@static/images/index/电气设计推广3.jpg', text: '电气设计推广3' }
      ],
      // 课程数据（使用原始项目图片）
      courseList1: [
        { id: 1, title: '建筑设计从入门到精通', image: '@static/images/index/建筑设计推广1.jpg', tag: '热门课程' },
        { id: 2, title: '建筑设计基础理论', image: '@static/images/index/建筑设计推广2.jpg', tag: '新课上线' },
        { id: 3, title: '建筑设计实战案例', image: '@static/images/index/建筑设计推广3.jpg', tag: '实战课程' },
        { id: 4, title: '建筑设计规范解读', image: '@static/images/index/名师课堂@2x.png', tag: '规范学习' }
      ],
      courseList2: [
        { id: 1, title: '结构设计从入门到精通', image: '@static/images/index/结构设计推广1.jpg', tag: '热门课程' },
        { id: 2, title: '结构设计基础理论', image: '@static/images/index/结构设计推广2.jpg', tag: '新课上线' },
        { id: 3, title: '结构设计实战案例', image: '@static/images/index/结构设计推广3.jpg', tag: '实战课程' },
        { id: 4, title: '结构设计规范解读', image: '@static/images/index/热门课程@2x.png', tag: '规范学习' }
      ],
      courseList3: [
        { id: 1, title: '给排水设计从入门到精通', image: '@static/images/index/给排水设计推广1.jpg', tag: '热门课程' },
        { id: 2, title: '给排水设计基础理论', image: '@static/images/index/给排水设计推广2.jpg', tag: '新课上线' },
        { id: 3, title: '给排水设计实战案例', image: '@static/images/index/给排水设计推广3.jpg', tag: '实战课程' },
        { id: 4, title: '给排水设计规范解读', image: '@static/images/index/特价优惠@2x.png', tag: '规范学习' }
      ],
      courseList4: [
        { id: 1, title: '暖通设计从入门到精通', image: '@static/images/index/暖通设计推广1.jpg', tag: '热门课程' },
        { id: 2, title: '暖通设计基础理论', image: '@static/images/index/暖通设计推广2.jpg', tag: '新课上线' },
        { id: 3, title: '暖通设计实战案例', image: '@static/images/index/暖通设计推广3.jpg', tag: '实战课程' },
        { id: 4, title: '暖通设计规范解读', image: '@static/images/index/最新公告@2x.png', tag: '规范学习' }
      ],
      courseList5: [
        { id: 1, title: '电气设计从入门到精通', image: '@static/images/index/电气设计推广1.jpg', tag: '热门课程' },
        { id: 2, title: '电气设计基础理论', image: '@static/images/index/电气设计推广2.jpg', tag: '新课上线' },
        { id: 3, title: '电气设计实战案例', image: '@static/images/index/电气设计推广3.jpg', tag: '实战课程' },
        { id: 4, title: '电气设计规范解读', image: '@static/images/index/免费体验@2x.png', tag: '规范学习' }
      ]
    }
  },
  methods: {
    changeTab(index) {
      this.current = index
    },
    goSearch() {
      this.$router.push({
        path: '/search',
        query: { keyword: this.keyword }
      })
    },
    goCourse(type, id) {
      this.$router.push({
        path: `/course/${type}_${id}`
      })
    }
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px 0;
}

/* 搜索栏样式 */
.search-section {
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  height: 44px;
}

.search-input {
  flex: 1;
  padding: 0 16px;
  border: 2px solid #5074FF;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-btn {
  padding: 0 24px;
  background-color: #5074FF;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #405ecb;
}

/* 标签页样式 */
.tabs-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  flex: 1;
  padding: 16px 20px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  color: #5074FF;
}

.tab.active {
  color: #5074FF;
  border-bottom-color: #5074FF;
  background-color: #fff;
}

/* 轮播图样式 */
.banner-section {
  padding: 20px;
}

.banner-swiper {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 课程列表样式 */
.courses-section {
  padding: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.course-card {
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.course-title {
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: 1.4;
}

.course-tag {
  display: inline-block;
  margin: 0 16px 16px 16px;
  padding: 4px 12px;
  background-color: #FFEEE5;
  color: #FF5A00;
  border-radius: 16px;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .banner-swiper {
    height: 200px;
  }
  
  .course-image {
    height: 140px;
  }
}
</style>