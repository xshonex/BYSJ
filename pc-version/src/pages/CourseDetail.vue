<template>
  <div class="course-detail-page">
    <!-- 加载提示 -->
    <div v-if="!courseDetail" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">正在加载课程信息...</p>
    </div>
    
    <!-- 课程内容 -->
    <template v-else>
      <!-- 基本信息 -->
      <div class="course-header">
        <div class="course-main-info">
          <div class="course-cover">
            <img :src="getCourseImageUrl()" 
                 :alt="courseDetail.title" class="cover-image">
          </div>
          <div class="course-info">
          <h4 class="course-title">{{ courseDetail.title }}</h4>
          <div class="course-meta">
            <span class="category">{{ courseDetail.category }}</span>
          </div>
          <!-- 详细介绍 -->
          <div class="course-intro-preview" v-html="courseDetail.intro"></div>
          <div class="course-actions">
            <button 
              class="btn btn-outline" 
              @click="addToFavorite"
            >
              <span>{{ isFavorite ? '已收藏' : '收藏' }}</span>
            </button>
          </div>
        </div>
        </div>
      </div>

      <!-- 内容导航 -->
      <div class="course-nav">
        <div class="nav-tabs">
          <div 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="['tab', { active: activeTab === index }]"
            @click="activeTab = index"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="course-content">
        <!-- 章节列表 -->
        <div v-if="activeTab === 0" class="course-chapters">
          <div 
            v-for="(chapter, chapterIndex) in courseDetail.chapters" 
            :key="chapterIndex"
            class="chapter"
          >
            <div class="chapter-header" @click="toggleChapter(chapterIndex)">
              <h3 class="chapter-title">
                <span class="chapter-number">{{ chapterIndex + 1 }}</span>
                {{ chapter.title }}
              </h3>
              <div class="chapter-actions">
                <span class="section-count">{{ chapter.sections.length }}小节</span>
                <span class="toggle-icon">{{ chapter.expanded ? '▼' : '▶' }}</span>
              </div>
            </div>
            <div v-if="chapter.expanded" class="chapter-sections">
              <div 
                v-for="(section, sectionIndex) in chapter.sections" 
                :key="sectionIndex"
                :class="['section', { active: section.isActive }]"
                @click="goToSection(chapterIndex, sectionIndex)"
              >
                <div class="section-info">
                  <span class="section-type">{{ section.type }}</span>
                  <span class="section-title">{{ section.title }}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- 课程介绍 -->
        <div v-if="activeTab === 1" class="course-intro">
          <div class="intro-content" v-html="courseDetail.intro"></div>
        </div>
      </div>
    </template>
  </div>
</template>















<script>
// 导入课程数据
import course1_1 from '@/data/courses/1_1.json'
import course1_2 from '@/data/courses/1_2.json'
import course1_3 from '@/data/courses/1_3.json'
import course1_4 from '@/data/courses/1_4.json'
import course2_1 from '@/data/courses/2_1.json'
import course2_2 from '@/data/courses/2_2.json'
import course2_3 from '@/data/courses/2_3.json'
import course2_4 from '@/data/courses/2_4.json'
import course3_1 from '@/data/courses/3_1.json'
import course3_2 from '@/data/courses/3_2.json'
import course3_3 from '@/data/courses/3_3.json'
import course3_4 from '@/data/courses/3_4.json'
import course4_1 from '@/data/courses/4_1.json'
import course4_2 from '@/data/courses/4_2.json'
import course4_3 from '@/data/courses/4_3.json'
import course4_4 from '@/data/courses/4_4.json'
import course5_1 from '@/data/courses/5_1.json'
import course5_2 from '@/data/courses/5_2.json'
import course5_3 from '@/data/courses/5_3.json'
import course5_4 from '@/data/courses/5_4.json'

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
}

export default {
  name: 'CourseDetail',
  data() {
    return {
      activeTab: 0,
      isFavorite: false,
      tabs: [
        { name: '课程章节' },
        { name: '课程介绍' }
      ],
      courseDetail: null
    }
  },
  
  methods: {
    // 获取图片URL
    getCourseImageUrl() {
      const validCategories = ['建筑设计', '结构设计', '给排水设计', '暖通设计']
      const category = validCategories.includes(this.courseDetail.category) 
        ? this.courseDetail.category 
        : '电气设计'
      return `/images/index/${category}推广1.jpg`
    },
    
    // 页面可见性处理
    handleVisibilityChange() {
      if (!document.hidden && this.courseDetail) {
        // 页面重新可见时，更新收藏状态
        this.updateFavoriteStatus()
      }
    },
    // 更新收藏状态
    updateFavoriteStatus() {
      const favorites = JSON.parse(localStorage.getItem('favoriteCourses') || '[]')
      this.isFavorite = favorites.some(course => course.id === this.courseDetail.id)
    },
    // 收藏操作
    addToFavorite() {
      let favorites = JSON.parse(localStorage.getItem('favoriteCourses') || '[]')
      
      if (!this.isFavorite) {
        // 添加收藏
        const courseToAdd = {
          id: this.courseDetail.id,
          title: this.courseDetail.title,
          intro: this.courseDetail.intro,
          image: '/images/index/' + this.courseDetail.title.replace(/[^一-龥]/g, '') + '推广1.jpg'
        }
        // 检查重复
        const exists = favorites.some(course => course.id === courseToAdd.id)
        if (!exists) {
          favorites.push(courseToAdd)
          this.isFavorite = true
        }
      } else {
        // 取消收藏
        favorites = favorites.filter(course => course.id !== this.courseDetail.id)
        this.isFavorite = false
      }
      
      localStorage.setItem('favoriteCourses', JSON.stringify(favorites))
    },
    toggleChapter(index) {
      this.courseDetail.chapters[index].expanded = !this.courseDetail.chapters[index].expanded
    },

    // 跳转到指定小节
    goToSection(chapterIndex, sectionIndex) {
      // 重置所有小节的活跃状态
      this.courseDetail.chapters.forEach(chapter => {
        chapter.sections.forEach(section => {
          section.isActive = false
        })
      })
      // 设置当前小节为活跃状态
      this.courseDetail.chapters[chapterIndex].sections[sectionIndex].isActive = true
    },

  },

  mounted() {
    // 加载课程数据
    const courseId = this.$route.params.id || '1_1' // 默认加载1_1课程
    
    // 加载默认课程
    this.courseDetail = courseDataMap[courseId] || courseDataMap['1_1']
    
    // 初始化收藏
    this.updateFavoriteStatus()
    
    // 监听可见性变化
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }
}
</script>























<style scoped>
.course-detail-page {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 加载动画 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #5074FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 基本信息 */
.course-header {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-main-info {
  display: flex;
  gap: 30px;
}

.course-cover {
  width: 400px;
  flex-shrink: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.course-info {
  flex: 1;
  text-align: center;
}

.course-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
}

.course-meta {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

.course-actions {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 12px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.btn-outline {
  background-color: #fff;
  color: #5074FF;
  border: 1px solid #5074FF;
}

.btn-outline:hover {
  background-color: #f0f3ff;
}

/* 内容导航 */
.course-nav {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
}

.tab {
  padding: 20px 30px;
  font-size: 16px;
  color: #666;
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
}

/* 内容区域 */
.course-content {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 章节 */
.chapter {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chapter-header:hover {
  background-color: #f0f0f0;
}

.chapter-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chapter-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #5074FF;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
}

.chapter-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
}

.toggle-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.chapter-sections {
  padding: 10px 0;
}

.section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.section:hover {
  background-color: #f9f9f9;
}

.section.active {
  background-color: #f0f3ff;
  border-left-color: #5074FF;
}

.section-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.section-type {
  padding: 2px 8px;
  background-color: #5074FF;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
}

.section-title {
  font-size: 16px;
  color: #333;
}

/* 介绍内容 */
.intro-content {
  line-height: 1.8;
  color: #333;
}

.intro-content h3 {
  margin: 20px 0 10px 0;
  font-size: 20px;
}

.intro-content h4 {
  margin: 15px 0 10px 0;
  font-size: 18px;
}

.intro-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.intro-content li {
  margin: 5px 0;
}



/* 介绍预览 */
.course-intro-preview {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
  line-height: 1.6;
  color: #333;
  font-size: 15px;
  max-height: 120px;
  overflow-y: auto;
}

.course-intro-preview p {
  margin: 8px 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .course-main-info {
    flex-direction: column;
  }
  
  .course-cover {
    width: 100%;
    height: 200px;
  }
  
  .course-actions {
    flex-direction: column;
  }
  
  .nav-tabs {
    overflow-x: auto;
  }
  

}
</style>