<template>
  <div class="learn-page">
    <h2 class="page-title">收藏课程</h2>
    
    <div v-if="favoriteCourses.length > 0" class="course-list">
      <div 
        v-for="course in favoriteCourses"
        :key="course.id"
        class="course-item"
      >
        <div class="course-cover">
            <img :src="getCourseImageUrl(course.title)" 
                 :alt="course.title" class="cover-image">
          </div>
        <div class="course-info">
          <h3 class="course-title" @click="goCourse(course.id)">{{ course.title }}</h3>
          <!-- 课程介绍 -->
          <div class="course-intro-preview" v-html="course.intro || '<p>暂无课程介绍</p>'"></div>
          <div class="course-actions">
            <button 
              class="unfavorite-btn"
              @click.stop="toggleFavorite(course)"
            >
              取消收藏
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-text">暂无收藏课程</div>
    </div>
  </div>
</template>












<script>
export default {
  name: 'Learn',
  data() {
    return {
      favoriteCourses: []
    }
  },
  created() {
    // 加载收藏
    this.loadFavorites()
  },
  mounted() {
    // 监听可见性变化
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  },
  watch: {
    // 监听收藏变化
    favoriteCourses: {
      handler(newVal) {
        localStorage.setItem('favoriteCourses', JSON.stringify(newVal))
      },
      deep: true
    }
  },
  methods: {
    // 获取图片URL
    getCourseImageUrl(title) {
      // 专业关键词映射
      const courseTypeMap = [
        { keywords: ['建筑设计'], type: '建筑设计' },
        { keywords: ['力学', '混凝土', '钢结构', '地基'], type: '结构设计' },
        { keywords: ['给排水', '给水', '排水', '水质'], type: '给排水设计' },
        { keywords: ['暖通', '空调', '通风', '制冷', '建筑节能'], type: '暖通设计' },
        { keywords: ['供配电', '照明', '智能化', '电气'], type: '电气设计' }
      ];
      
      // 查找匹配类型
      const foundType = courseTypeMap.find(item => 
        item.keywords.some(keyword => title.includes(keyword))
      );
      
      // 返回对应图片
      const courseType = foundType ? foundType.type : '建筑设计';
      return `/images/index/${courseType}推广1.jpg`;
    },
    
    goCourse(id) {
      this.$router.push({
        path: `/course/${id}`
      })
    },
    // 加载收藏
    loadFavorites() {
      const favorites = localStorage.getItem('favoriteCourses')
      if (favorites) {
        this.favoriteCourses = JSON.parse(favorites)
      }
    },
    // 取消收藏
    toggleFavorite(course) {
      const index = this.favoriteCourses.findIndex(item => item.id === course.id)
      if (index !== -1) {
        // 移除收藏
        this.favoriteCourses.splice(index, 1)
      }
    },
    // 页面可见性处理
    handleVisibilityChange() {
      if (!document.hidden) {
        // 页面可见时重新加载
        this.loadFavorites()
      }
    }
  }
}
</script>




















<style scoped>
.learn-page {
  padding: 20px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.course-item {
  display: flex;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.course-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.course-cover {
  width: 200px;
  flex-shrink: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-info {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.4;
  cursor: pointer;
}

/* 介绍预览 */
.course-intro-preview {
  margin: 10px 0 15px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
  line-height: 1.6;
  color: #666;
  font-size: 14px;
  min-height: 60px;
  border-left: 3px solid #5074FF;
}

.course-intro-preview p {
  margin: 4px 0;
  text-align: justify;
}

.course-intro-preview::-webkit-scrollbar {
  width: 4px;
}

.course-intro-preview::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.course-intro-preview::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.course-intro-preview::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.course-actions {
  display: flex;
  justify-content: flex-end;
}

.unfavorite-btn {
  padding: 6px 16px;
  border: 1px solid #ff4757;
  background-color: #fff;
  color: #ff4757;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.unfavorite-btn:hover {
  background-color: #ff4757;
  color: #fff;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}


/* 响应式 */
@media (max-width: 768px) {
  .course-item {
    flex-direction: column;
  }
  
  .course-cover {
    width: 100%;
    height: 180px;
  }
  
  .course-info {
    padding: 16px;
  }
  
  .course-title {
    font-size: 16px;
  }
}
</style>