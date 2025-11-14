<template>
  <div class="home-page">
    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="建筑设计从入门到精通" 
          v-model="keyword"
          class="search-input"
          @keyup.enter="searchCourses"
        >
        <select v-model="selectedMajor" class="major-select">
          <option value="0">全部专业</option>
          <option value="1">建筑</option>
          <option value="2">结构</option>
          <option value="3">给排水</option>
          <option value="4">暖通</option>
          <option value="5">电气</option>
        </select>
        <button class="search-btn" @click="searchCourses">搜索</button>
      </div>
    </div>
    <!-- 搜索结果区域 -->
    <div v-if="showSearchResults && searchResults.length > 0" class="search-results">
      <h3 class="section-title">搜索结果</h3>
      <div class="courses-grid">
        <div 
          v-for="(item, index) in searchResults" 
          :key="index"
          class="course-card"
          @click="goCourse(item.type, item.id)"
        >
          <img :src="item.image" :alt="item.title" class="course-image" />
          <h4 class="course-title">{{ item.title }}</h4>
          <span class="course-tag">{{ item.tag }}</span>
        </div>
      </div>
    </div>
    <!-- 无搜索结果提示 -->
    <div v-else-if="showSearchResults && searchResults.length === 0" class="no-results">
      <p>未找到相关课程，请尝试其他关键词</p>
    </div>
    <!-- 标签页 -->
    <div v-if="!showSearchResults" class="tabs-container">
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
        <div class="tab-pane">
          <!-- 轮播图 -->
          <div class="banner-swiper">
            <!-- 轮播图片 -->
            <div class="swiper-container">
              <img 
                v-for="(item, index) in currentSwiperList" 
                :key="index"
                :src="item.image" 
                :alt="item.text"
                class="banner-image"
                :class="{ active: currentSlideIndex[current] === index }"
              />
            </div>
            <!-- 控制按钮 -->
            <button class="swiper-prev" @click="prevSlide">&lt;</button>
            <button class="swiper-next" @click="nextSlide">&gt;</button>
            <!-- 指示器 -->
            <div class="swiper-indicators">
              <span 
                v-for="(item, index) in currentSwiperList" 
                :key="index"
                :class="{ active: currentSlideIndex[current] === index }"
                @click="currentSlideIndex[current] = index"
              ></span>
            </div>
          </div>

          <!-- 课程列表 -->
          <div class="courses-section">
            <h3 class="section-title">推荐课程</h3>
            <div class="courses-grid">
              <div 
                v-for="(item, index) in currentCourseList" 
                :key="index"
                class="course-card"
                @click="goCourse(current + 1, item.id)"
              >
                <img :src="item.image" :alt="item.title" class="course-image" />
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
// 导入课程数据
import course1_1 from '../data/courses/1_1.json';
import course1_2 from '../data/courses/1_2.json';
import course1_3 from '../data/courses/1_3.json';
import course1_4 from '../data/courses/1_4.json';
import course2_1 from '../data/courses/2_1.json';
import course2_2 from '../data/courses/2_2.json';
import course2_3 from '../data/courses/2_3.json';
import course2_4 from '../data/courses/2_4.json';
import course3_1 from '../data/courses/3_1.json';
import course3_2 from '../data/courses/3_2.json';
import course3_3 from '../data/courses/3_3.json';
import course3_4 from '../data/courses/3_4.json';
import course4_1 from '../data/courses/4_1.json';
import course4_2 from '../data/courses/4_2.json';
import course4_3 from '../data/courses/4_3.json';
import course4_4 from '../data/courses/4_4.json';
import course5_1 from '../data/courses/5_1.json';
import course5_2 from '../data/courses/5_2.json';
import course5_3 from '../data/courses/5_3.json';
import course5_4 from '../data/courses/5_4.json';

export default {
  name: 'Home',
  data() {
    return {
      currentSlideIndex: [0, 0, 0, 0, 0],
      current: 0,
      keyword: '',
      selectedMajor: '0', // 0表示全部专业
      showSearchResults: false,
      searchResults: [],
      tabList: [
        { name: '建筑设计' },
        { name: '结构设计' },
        { name: '给排水设计' },
        { name: '暖通设计' },
        { name: '电气设计' }
      ],
      // 轮播数据
      swiperLists: [
        [
          { image: '/images/index/建筑设计推广1.jpg', text: '建筑设计推广1' },
          { image: '/images/index/建筑设计推广2.jpg', text: '建筑设计推广2' },
          { image: '/images/index/建筑设计推广3.jpg', text: '建筑设计推广3' },
          { image: '/images/index/建筑设计推广4.jpg', text: '建筑设计推广4' }
        ],
        [
          { image: '/images/index/结构设计推广1.jpg', text: '结构设计推广1' },
          { image: '/images/index/结构设计推广2.jpg', text: '结构设计推广2' },
          { image: '/images/index/结构设计推广3.jpg', text: '结构设计推广3' },
          { image: '/images/index/结构设计推广4.jpg', text: '结构设计推广4' }
        ],
        [
          { image: '/images/index/给排水设计推广1.jpg', text: '给排水设计推广1' },
          { image: '/images/index/给排水设计推广2.jpg', text: '给排水设计推广2' },
          { image: '/images/index/给排水设计推广3.jpg', text: '给排水设计推广3' },
          { image: '/images/index/给排水设计推广4.jpg', text: '给排水设计推广4' }
        ],
        [
          { image: '/images/index/暖通设计推广1.jpg', text: '暖通设计推广1' },
          { image: '/images/index/暖通设计推广2.jpg', text: '暖通设计推广2' },
          { image: '/images/index/暖通设计推广3.jpg', text: '暖通设计推广3' },
          { image: '/images/index/暖通设计推广4.jpg', text: '暖通设计推广4' }
        ],
        [
          { image: '/images/index/电气设计推广1.jpg', text: '电气设计推广1' },
          { image: '/images/index/电气设计推广2.jpg', text: '电气设计推广2' },
          { image: '/images/index/电气设计推广3.jpg', text: '电气设计推广3' },
          { image: '/images/index/电气设计推广4.jpg', text: '电气设计推广4' }
        ]
      ],
      swiperTimer: null,
      // 课程数据
      courseLists: [
        [
            { id: 1, title: '建筑设计从入门到精通' },
            { id: 2, title: '建筑设计原理' },
            { id: 3, title: '建筑历史与理论' },
            { id: 4, title: '建筑构造与材料' }
          ],
        [
          { id: 1, title: '钢结构设计' },
          { id: 2, title: '混凝土结构设计' },
          { id: 3, title: '结构力学' },
          { id: 4, title: '地基基础设计' }
        ],
        [
          { id: 1, title: '给水工程' },
          { id: 2, title: '排水工程' },
          { id: 3, title: '水质工程学' },
          { id: 4, title: '建筑给排水工程' }
        ],
        [
          { id: 1, title: '暖通空调原理' },
          { id: 2, title: '制冷技术' },
          { id: 3, title: '通风工程' },
          { id: 4, title: '建筑节能技术' }
        ],
        [
          { id: 1, title: '建筑供配电' },
          { id: 2, title: '建筑照明' },
          { id: 3, title: '建筑智能化' },
          { id: 4, title: '电气安全与节能' }
        ]
      ]
    }
  },
  computed: {
    // 当前轮播数据
    currentSwiperList() {
      return this.swiperLists[this.current];
    },
    // 当前课程数据
    currentCourseList() {
      return this.courseLists[this.current];
    }
  },
  methods: {
    searchCourses() {
      if (!this.keyword.trim()) {
        this.showSearchResults = false;
        this.current = 0; // 重置到建筑设计标签页
        return;
      }
      // 重置搜索结果
      this.searchResults = [];
      
      // 遍历所有专业的所有课程进行搜索
      for (let typeIndex = 0; typeIndex < this.courseLists.length; typeIndex++) {
        const courseType = typeIndex + 1; // 类型编号从1开始
        
        // 筛选专业
        if (this.selectedMajor !== '0' && parseInt(this.selectedMajor) !== courseType) {
          continue;
        }
        
        const courseList = this.courseLists[typeIndex];
        
        // 筛选课程
        const matchedCourses = courseList.filter(course => 
          course.title.includes(this.keyword)
        );
        
        // 添加到结果
        matchedCourses.forEach(course => {
          this.searchResults.push({
            ...course,
            type: courseType
          });
        });
      }
      
      this.showSearchResults = true;
    },
    // 重置页面
    resetToHomeTab() {
      this.current = 0; // 建筑设计标签的索引
      this.showSearchResults = false; // 隐藏搜索结果
      this.keyword = ''; // 清空搜索关键词
      this.selectedMajor = '0'; // 重置到全部专业
      this.searchResults = []; // 清空搜索结果数组
    },
    changeTab(index) {
      this.current = index;
      this.currentSlideIndex[index] = 0;
    },
    startSwiper() {
      this.clearSwiperTimer();
      // 页面可见时创建定时器
      if (!document.hidden) {
        this.swiperTimer = setInterval(() => {
          this.currentSlideIndex[this.current] = (this.currentSlideIndex[this.current] + 1) % this.currentSwiperList.length;
        }, 3000);
      }
    },
    clearSwiperTimer() {
      if (this.swiperTimer) {
        clearInterval(this.swiperTimer);
        this.swiperTimer = null;
      }
    },
    // 重置定时器
    resetSwiperTimer() {
      this.startSwiper();
    },
    prevSlide() {
      this.currentSlideIndex[this.current] = (this.currentSlideIndex[this.current] - 1 + this.currentSwiperList.length) % this.currentSwiperList.length;
      this.resetSwiperTimer();
    },
    nextSlide() {
      this.currentSlideIndex[this.current] = (this.currentSlideIndex[this.current] + 1) % this.currentSwiperList.length;
      this.resetSwiperTimer();
    },
    // 页面可见性变化处理
    handleVisibilityChange() {
      if (document.hidden) {
        this.clearSwiperTimer();
      } else {
        this.startSwiper();
      }
    },
    goCourse(type, id) {
      this.$router.push({
        path: `/course/${type}_${id}`
      });
    },
    // 加载课程数据
    loadCourseData() {
      // 课程数据映射
      const courseDataMap = {
        '1_1': course1_1,
        '1_2': course1_2,
        '1_3': course1_3,
        '1_4': course1_4,
        '2_1': course2_1,
        '2_2': course2_2,
        '2_3': course2_3,
        '2_4': course2_4,
        '3_1': course3_1,
        '3_2': course3_2,
        '3_3': course3_3,
        '3_4': course3_4,
        '4_1': course4_1,
        '4_2': course4_2,
        '4_3': course4_3,
        '4_4': course4_4,
        '5_1': course5_1,
        '5_2': course5_2,
        '5_3': course5_3,
        '5_4': course5_4
      };
      
      // 遍历课程类型
      for (let typeIndex = 0; typeIndex < this.courseLists.length; typeIndex++) {
        const courseType = typeIndex + 1; // 类型编号从1开始
        const courseList = this.courseLists[typeIndex];
        
        // 遍历当前课程
        for (let courseIndex = 0; courseIndex < courseList.length; courseIndex++) {
          const courseId = courseList[courseIndex].id;
          const courseKey = `${courseType}_${courseId}`;
          
          if (courseDataMap[courseKey]) {
            // 合并image和tag字段到courseLists
            this.courseLists[typeIndex][courseIndex].image = courseDataMap[courseKey].image;
            this.courseLists[typeIndex][courseIndex].tag = courseDataMap[courseKey].tag;
          }
        }
      }
    }
  },
  mounted() {
    this.loadCourseData();
    this.startSwiper();
    // 添加事件监听
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  },
  beforeUnmount() {
    this.clearSwiperTimer();
    // 移除监听
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
  watch: {
    current() {
      this.startSwiper();
    }
  }
};
</script>
























<style scoped>
/* 主容器 */
.home-page {
  padding: 20px;
}

/* 标签页 */
.tabs-container {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 标签按钮 */
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

.tab:hover,
.tab.active {
  color: #5074FF;
}

.tab.active {
  border-bottom-color: #5074FF;
  background-color: #fff;
}

/* 轮播图 */
.banner-swiper {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  margin: 20px;
}

.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 轮播图片 */
.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.banner-image.active {
  opacity: 1;
}

/* 控制按钮 */
.swiper-prev,
.swiper-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.swiper-prev {
  left: 20px;
}

.swiper-next {
  right: 20px;
}

/* 指示器 */
.swiper-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.swiper-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.swiper-indicators span.active {
  background: white;
}

/* 课程区域 */
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

/* 课程卡片 */
.course-card {
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  cursor: pointer;
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

/* 搜索栏 */
.search-section {
  margin-bottom: 30px;
}

.search-box {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  height: 44px;
}

.search-input {
  flex: 1;
  padding: 0 16px;
  border: 2px solid #5074FF;
  border-right: 1px solid #5074FF;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.major-select {
  padding: 0 12px;
  border: 2px solid #5074FF;
  border-left: 1px solid #5074FF;
  border-right: none;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  outline: none;
  cursor: pointer;
  background-color: white;
}

.major-select:focus {
  border-color: #5074FF;
}

.search-btn {
  padding: 0 24px;
  background-color: #5074FF;
  color: #fff;
  border: 2px solid #5074FF;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #405ecb;
}

/* 搜索结果 */
.search-results {
  max-width: 1200px;
  margin: 0 auto 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 无搜索结果 */
.no-results {
  max-width: 1200px;
  margin: 0 auto 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  color: #666;
}

</style>