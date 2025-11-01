<template>
  <div class="course-detail-page">
    <!-- 课程基本信息 -->
    <div class="course-header">
      <div class="course-main-info">
        <div class="course-cover">
          <img :src="courseDetail.image" :alt="courseDetail.title" class="cover-image">
        </div>
        <div class="course-info">
          <h1 class="course-title">{{ courseDetail.title }}</h1>
          <div class="course-meta">
            <span class="category">{{ courseDetail.category }}</span>
            <span class="students">{{ courseDetail.students }}人学习</span>
            <span class="duration">{{ courseDetail.duration }}</span>
          </div>
          <div class="course-progress">
            <span class="progress-text">学习进度：{{ courseDetail.progress }}</span>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: courseDetail.progress }"></div>
            </div>
          </div>
          <div class="course-actions">
            <button class="btn btn-primary btn-lg" @click="continueLearning">继续学习</button>
            <button class="btn btn-outline" @click="addToFavorite">
              {{ isFavorite ? '已收藏' : '收藏' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 课程内容导航 -->
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

    <!-- 课程内容区域 -->
    <div class="course-content">
      <!-- 课程章节 -->
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
              <div class="section-meta">
                <span class="section-duration">{{ section.duration }}</span>
                <span v-if="section.completed" class="section-status">已完成</span>
                <span v-else-if="section.isActive" class="section-status active">进行中</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程介绍 -->
      <div v-if="activeTab === 1" class="course-intro">
        <div class="intro-content" v-html="courseDetail.intro"></div>
      </div>

      <!-- 讲师介绍 -->
      <div v-if="activeTab === 2" class="course-teacher">
        <div class="teacher-info">
          <img :src="courseDetail.teacher.avatar" :alt="courseDetail.teacher.name" class="teacher-avatar">
          <div class="teacher-details">
            <h3 class="teacher-name">{{ courseDetail.teacher.name }}</h3>
            <p class="teacher-title">{{ courseDetail.teacher.title }}</p>
            <p class="teacher-desc">{{ courseDetail.teacher.description }}</p>
          </div>
        </div>
        <div class="teacher-courses">
          <h4 class="courses-title">讲师的其他课程</h4>
          <div class="teacher-course-list">
            <div 
              v-for="(item, index) in courseDetail.teacher.otherCourses" 
              :key="index"
              class="teacher-course-item"
              @click="goToOtherCourse(item.id)"
            >
              <img :src="item.image" :alt="item.title" class="course-thumb">
              <span class="course-name">{{ item.title }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 学员评价 -->
      <div v-if="activeTab === 3" class="course-reviews">
        <div class="review-stats">
          <div class="total-score">
            <span class="score-value">{{ courseDetail.reviews.score }}</span>
            <div class="star-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= Math.floor(courseDetail.reviews.score) }">★</span>
            </div>
            <span class="review-count">{{ courseDetail.reviews.count }}条评价</span>
          </div>
          <div class="score-distribution">
            <div v-for="i in 5" :key="i" class="score-item">
              <span class="score-label">{{ i }}星</span>
              <div class="score-bar">
                <div class="score-fill" :style="{ width: courseDetail.reviews.distribution[5-i] + '%' }"></div>
              </div>
              <span class="score-percentage">{{ courseDetail.reviews.distribution[5-i] }}%</span>
            </div>
          </div>
        </div>
        <div class="review-list">
          <div 
            v-for="(review, index) in courseDetail.reviews.list" 
            :key="index"
            class="review-item"
          >
            <div class="review-header">
              <img :src="review.user.avatar" :alt="review.user.name" class="reviewer-avatar">
              <div class="reviewer-info">
                <span class="reviewer-name">{{ review.user.name }}</span>
                <div class="review-star">
                  <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= review.score }">★</span>
                </div>
                <span class="review-date">{{ review.date }}</span>
              </div>
            </div>
            <p class="review-content">{{ review.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseDetail',
  data() {
    return {
      activeTab: 0,
      isFavorite: false,
      courseDetail: {
        id: '1_1',
        title: '建筑设计从入门到精通',
        category: '建筑设计',
        students: 1234,
        duration: '48小时',
        progress: '30%',
        image: '/src/assets/images/learn/建筑设计课程封面.png',
        chapters: [
          {
            title: '第一章 建筑设计基础',
            expanded: true,
            sections: [
              {
                title: '1.1 建筑设计概述',
                type: '视频',
                duration: '45分钟',
                isActive: true,
                completed: false
              },
              {
                title: '1.2 建筑设计基本原则',
                type: '视频',
                duration: '30分钟',
                isActive: false,
                completed: true
              },
              {
                title: '1.3 建筑设计规范与标准',
                type: '视频',
                duration: '60分钟',
                isActive: false,
                completed: false
              }
            ]
          },
          {
            title: '第二章 建筑设计方法',
            expanded: false,
            sections: [
              {
                title: '2.1 方案设计',
                type: '视频',
                duration: '40分钟',
                isActive: false,
                completed: false
              },
              {
                title: '2.2 扩初设计',
                type: '视频',
                duration: '50分钟',
                isActive: false,
                completed: false
              }
            ]
          }
        ],
        intro: `<h3>课程介绍</h3><p>本课程是建筑设计入门到精通的系统课程，适合零基础学习者以及需要提升专业技能的在职人员。</p><p>课程内容涵盖建筑设计基础知识、设计方法、规范标准、案例分析等全面内容，通过系统学习，让学员能够独立完成建筑方案设计。</p><h4>学习目标</h4><ul><li>掌握建筑设计的基本理论和方法</li><li>熟悉建筑设计规范和标准</li><li>能够独立完成中小型建筑项目的方案设计</li><li>提升建筑设计水平和竞争力</li></ul>`,
        teacher: {
          name: '张教授',
          title: '高级建筑师',
          description: '20年建筑设计经验，参与过多个大型建筑项目的设计工作，在建筑设计领域有丰富的实践经验和教学经验。',
          avatar: '@static/images/me/头像.png',
          otherCourses: [
            {
              id: '1_2',
              title: '建筑设计进阶',
              image: '@static/images/index/建筑设计推广2.jpg'
            },
            {
              id: '1_3',
              title: '建筑设计实战案例',
              image: '@static/images/index/建筑设计推广3.jpg'
            }
          ]
        },
        reviews: {
          score: 4.8,
          count: 245,
          distribution: [90, 8, 2, 0, 0],
          list: [
            {
              user: {
                name: '李同学',
                avatar: '@static/images/me/头像.png'
              },
              score: 5,
              date: '2023-06-15',
              content: '课程非常好，讲解详细，内容丰富，老师经验丰富，讲解清晰，推荐给想学习建筑设计的同学！'
            },
            {
              user: {
                name: '王同学',
                avatar: '@static/images/me/头像.png'
              },
              score: 4,
              date: '2023-06-10',
              content: '课程内容很充实，学到了很多实用的知识，就是有些地方讲解速度可以再慢一点。'
            }
          ]
        }
      }
    }
  },
  methods: {
    toggleChapter(index) {
      this.courseDetail.chapters[index].expanded = !this.courseDetail.chapters[index].expanded
    },
    goToSection(chapterIndex, sectionIndex) {
      // 取消当前活跃状态
      this.courseDetail.chapters.forEach(chapter => {
        chapter.sections.forEach(section => {
          section.isActive = false
        })
      })
      // 设置新的活跃状态
      this.courseDetail.chapters[chapterIndex].sections[sectionIndex].isActive = true
    },
    continueLearning() {
      // 找到当前活跃的章节和小节
      let chapterIndex = 0
      let sectionIndex = 0
      
      for (let i = 0; i < this.courseDetail.chapters.length; i++) {
        for (let j = 0; j < this.courseDetail.chapters[i].sections.length; j++) {
          if (this.courseDetail.chapters[i].sections[j].isActive) {
            chapterIndex = i
            sectionIndex = j
            break
          }
        }
      }
      
      this.goToSection(chapterIndex, sectionIndex)
      console.log('继续学习', chapterIndex, sectionIndex)
    },
    addToFavorite() {
      this.isFavorite = !this.isFavorite
    },
    goToOtherCourse(id) {
      this.$router.push({
        path: `/course/${id}`
      })
    }
  },
  mounted() {
    // 可以在这里根据路由参数加载具体课程数据
    const courseId = this.$route.params.id
    console.log('加载课程ID:', courseId)
    // 这里可以添加API调用，根据courseId获取课程详情
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

/* 课程基本信息 */
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

.course-progress {
  margin-bottom: 30px;
}

.progress-text {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #5074FF;
  border-radius: 4px;
  transition: width 0.3s ease;
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

.btn-primary {
  background-color: #5074FF;
  color: #fff;
}

.btn-primary:hover {
  background-color: #405ecb;
}

.btn-lg {
  padding: 16px 40px;
  font-size: 18px;
}

.btn-outline {
  background-color: #fff;
  color: #5074FF;
  border: 1px solid #5074FF;
}

.btn-outline:hover {
  background-color: #f0f3ff;
}

/* 课程内容导航 */
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

/* 课程内容区域 */
.course-content {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 课程章节 */
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

.section-meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-duration {
  font-size: 14px;
  color: #666;
}

.section-status {
  font-size: 14px;
  color: #999;
}

.section-status.active {
  color: #5074FF;
}

/* 课程介绍 */
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

/* 讲师介绍 */
.teacher-info {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
}

.teacher-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.teacher-details {
  flex: 1;
}

.teacher-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.teacher-title {
  font-size: 16px;
  color: #5074FF;
  margin-bottom: 10px;
}

.teacher-desc {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

.courses-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.teacher-course-list {
  display: flex;
  gap: 20px;
}

.teacher-course-item {
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.teacher-course-item:hover {
  transform: translateY(-4px);
}

.course-thumb {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.course-name {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 学员评价 */
.review-stats {
  display: flex;
  gap: 60px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
}

.total-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-value {
  font-size: 48px;
  font-weight: 600;
  color: #5074FF;
  margin-bottom: 10px;
}

.star-rating {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.star {
  font-size: 20px;
  color: #e0e0e0;
}

.star.active {
  color: #FFD700;
}

.review-count {
  font-size: 14px;
  color: #666;
}

.score-distribution {
  flex: 1;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.score-label {
  width: 30px;
  font-size: 14px;
  color: #666;
}

.score-bar {
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background-color: #5074FF;
  border-radius: 4px;
}

.score-percentage {
  width: 40px;
  font-size: 14px;
  color: #666;
  text-align: right;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.review-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.reviewer-info {
  flex: 1;
}

.reviewer-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.review-star {
  display: flex;
  gap: 3px;
  margin-bottom: 5px;
}

.review-star .star {
  font-size: 12px;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-content {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

/* 响应式调整 */
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
  
  .teacher-info {
    flex-direction: column;
    text-align: center;
  }
  
  .teacher-course-list {
    flex-wrap: wrap;
  }
  
  .review-stats {
    flex-direction: column;
    gap: 30px;
  }
}
</style>