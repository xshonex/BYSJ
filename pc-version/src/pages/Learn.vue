<template>
  <div class="learn-page">
    <h2 class="page-title">学习</h2>
    
    <div class="course-list">
      <div 
        v-for="(item, index) in courseList" 
        :key="index"
        class="course-item"
        @click="goCourse(item.id)"
      >
        <div class="course-cover">
          <img :src="item.image" :alt="item.title" class="cover-image">
        </div>
        <div class="course-info">
          <h3 class="course-title">{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Learn',
  data() {
    return {
      courseList: [
        {
          id: '1_1',
          title: '建筑设计从入门到精通',
          image: '/images/index/建筑设计推广1.jpg',
        },
        {
          id: '2_1',
          title: '结构设计从入门到精通',
          image: '/images/index/结构设计推广1.jpg',
        },
        {
          id: '3_1',
          title: '给排水设计从入门到精通',
          image: '/images/index/给排水设计推广1.jpg',
        },
        {
          id: '4_1',
          title: '暖通设计从入门到精通',
          image: '/images/index/暖通设计推广1.jpg',
        },
        {
          id: '5_1',
          title: '电气设计从入门到精通',
          image: '/images/index/电气设计推广1.jpg',
        }
      ]
    }
  },
  methods: {
    goCourse(id) {
      this.$router.push({
        path: `/course/${id}`
      })
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
}

.course-meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.progress {
  font-size: 16px;
  color: #5074FF;
  font-weight: 500;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  text-align: center;
}

.empty-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}

/* 响应式调整 */
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