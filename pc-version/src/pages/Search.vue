<template>
  <div class="search-page">
    <div class="search-header">
      <div class="search-input-wrapper">
        <input 
          v-model="searchText"
          type="text"
          placeholder="搜索课程、知识点、讲师"
          class="search-input"
          @keyup.enter="search"
        >
        <button class="search-btn" @click="search">搜索</button>
      </div>
    </div>

    <div v-if="searchResults.length > 0" class="search-results">
      <div class="results-header">
        <h2 class="results-title">
          "{{ searchText }}" 的搜索结果 ({{ searchResults.length }})
        </h2>
        <div class="filter-options">
          <select v-model="sortBy" class="sort-select" @change="search">
            <option value="relevance">相关度</option>
            <option value="newest">最新</option>
            <option value="popularity">人气</option>
            <option value="price_asc">价格从低到高</option>
            <option value="price_desc">价格从高到低</option>
          </select>
        </div>
      </div>

      <div class="results-list">
        <div 
          v-for="(item, index) in searchResults" 
          :key="index"
          class="result-item"
          @click="goCourseDetail(item.id)"
        >
          <div class="course-cover">
            <img :src="item.image" :alt="item.title" class="cover-image">
          </div>
          <div class="course-info">
            <h3 class="course-title">{{ item.title }}</h3>
            <p class="course-desc">{{ item.description }}</p>
            <div class="course-meta">
              <span class="course-category">{{ item.category }}</span>
              <span class="course-teacher">{{ item.teacher }}</span>
              <span class="course-students">{{ item.students }}人学习</span>
            </div>
            <div class="course-bottom">
              <span v-if="item.price > 0" class="course-price">¥{{ item.price }}</span>
              <span v-else class="course-free">免费</span>
              <div class="course-rating">
                <span class="star-rating">
                  <span v-for="i in 5" :key="i" class="star" :class="{ active: i <= item.rating }">★</span>
                </span>
                <span class="rating-score">{{ item.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          上一页
        </button>
        <button 
          v-for="page in pageRange" 
          :key="page"
          class="page-btn" 
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 搜索为空状态 -->
    <div v-else-if="hasSearched" class="empty-search">
      <img src="/src/assets/images/search/空状态.png" alt="无搜索结果" class="empty-image">
      <p class="empty-text">未找到相关课程</p>
      <p class="empty-hint">换个关键词试试，或者浏览推荐课程</p>
    </div>

    <!-- 热门搜索 -->
    <div v-else class="hot-search">
      <h2 class="hot-title">热门搜索</h2>
      <div class="hot-tags">
        <span 
          v-for="(tag, index) in hotSearchTags" 
          :key="index"
          class="hot-tag"
          @click="searchByTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- 推荐课程 -->
      <div class="recommended-courses">
        <h2 class="recommended-title">推荐课程</h2>
        <div class="course-card-list">
          <div 
            v-for="(course, index) in recommendedCourses" 
            :key="index"
            class="course-card"
            @click="goCourseDetail(course.id)"
          >
            <div class="course-card-cover">
              <img :src="course.image" :alt="course.title" class="card-image">
            </div>
            <div class="course-card-info">
              <h3 class="card-title">{{ course.title }}</h3>
              <div class="card-meta">
                <span class="card-students">{{ course.students }}人学习</span>
                <span class="card-rating">{{ course.rating }}</span>
              </div>
              <div class="card-price">
                <span v-if="course.price > 0" class="price-value">¥{{ course.price }}</span>
                <span v-else class="price-free">免费</span>
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
  name: 'Search',
  data() {
    return {
      searchText: '',
      searchResults: [],
      hasSearched: false,
      sortBy: 'relevance',
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      hotSearchTags: [
        '建筑设计', '结构设计', '给排水设计', '暖通设计', '电气设计',
        'BIM技术', 'CAD制图', '工程管理', '工程造价', '施工技术'
      ],
      recommendedCourses: [
        {
          id: '1_1',
          title: '建筑设计从入门到精通',
          image: '/src/assets/images/learn/建筑设计课程封面.png',
          students: 1234,
          rating: 4.8,
          price: 299
        },
        {
          id: '2_1',
          title: '结构设计从入门到精通',
          image: '/src/assets/images/learn/结构设计课程封面.png',
          students: 890,
          rating: 4.7,
          price: 399
        },
        {
          id: '3_1',
          title: '给排水设计从入门到精通',
          image: '/src/assets/images/learn/给排水设计课程封面.png',
          students: 654,
          rating: 4.6,
          price: 299
        },
        {
          id: '4_1',
          title: '暖通设计从入门到精通',
          image: '/src/assets/images/learn/暖通设计课程封面.png',
          students: 432,
          rating: 4.5,
          price: 299
        }
      ]
    }
  },
  computed: {
    pageRange() {
      // 简化的分页逻辑，实际项目中可能需要更复杂的处理
      const range = []
      const maxVisiblePages = 5
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1)
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        range.push(i)
      }
      
      return range
    }
  },
  methods: {
    search() {
      if (!this.searchText.trim()) return
      
      this.hasSearched = true
      this.currentPage = 1
      
      // 模拟搜索结果
      this.searchResults = [
        {
          id: '1_1',
          title: '建筑设计从入门到精通',
          description: '本课程是建筑设计入门到精通的系统课程，适合零基础学习者以及需要提升专业技能的在职人员。',
          image: '@static/images/index/建筑设计推广1.jpg',
          category: '建筑设计',
          teacher: '张教授',
          students: 1234,
          rating: 4.8,
          price: 299
        },
        {
          id: '1_2',
          title: '建筑设计进阶课程',
          description: '针对有一定基础的建筑设计人员，深入讲解建筑设计的高级技巧和方法。',
          image: '@static/images/index/建筑设计推广2.jpg',
          category: '建筑设计',
          teacher: '李讲师',
          students: 890,
          rating: 4.7,
          price: 399
        },
        {
          id: '1_3',
          title: '建筑设计实战案例分析',
          description: '通过实际案例分析，掌握建筑设计的实际应用和解决问题的方法。',
          image: '@static/images/index/建筑设计推广3.jpg',
          category: '建筑设计',
          teacher: '王教授',
          students: 654,
          rating: 4.9,
          price: 499
        },
        {
          id: '1_4',
          title: '建筑设计规范与标准解读',
          description: '详细解读最新建筑设计规范和标准，帮助设计师避免设计中的常见问题。',
          image: '@static/images/index/名师课堂@2x.png',
          category: '建筑设计',
          teacher: '张教授',
          students: 432,
          rating: 4.6,
          price: 199
        }
      ]
      
      this.totalPages = Math.ceil(this.searchResults.length / this.pageSize)
    },
    searchByTag(tag) {
      this.searchText = tag
      this.search()
    },
    changePage(page) {
      this.currentPage = page
      // 这里可以根据页码加载对应的数据
    },
    goCourseDetail(id) {
      this.$router.push({
        path: `/course/${id}`
      })
    }
  }
}
</script>

<style scoped>
.search-page {
  padding: 20px 0;
}

/* 搜索头部 */
.search-header {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.search-input-wrapper {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 0;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-right: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #5074FF;
}

.search-btn {
  padding: 15px 30px;
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

/* 搜索结果 */
.search-results {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.results-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.sort-select {
  padding: 8px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.result-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-cover {
  width: 200px;
  flex-shrink: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.course-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-meta {
  display: flex;
  gap: 20px;
  margin-bottom: auto;
  font-size: 14px;
  color: #999;
}

.course-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.course-price {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b6b;
}

.course-free {
  font-size: 16px;
  color: #5074FF;
  padding: 2px 8px;
  background-color: #f0f3ff;
  border-radius: 4px;
}

.course-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.star-rating {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 14px;
  color: #e0e0e0;
}

.star.active {
  color: #FFD700;
}

.rating-score {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #5074FF;
  color: #5074FF;
}

.page-btn.active {
  background-color: #5074FF;
  border-color: #5074FF;
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 搜索为空状态 */
.empty-search {
  background: #fff;
  border-radius: 8px;
  padding: 60px 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-image {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.empty-hint {
  font-size: 14px;
  color: #999;
}

/* 热门搜索 */
.hot-search {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hot-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.hot-tag {
  padding: 8px 20px;
  background-color: #f0f0f0;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hot-tag:hover {
  background-color: #5074FF;
  color: #fff;
}

/* 推荐课程 */
.recommended-courses {
  margin-top: 40px;
}

.recommended-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.course-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.course-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.course-card-cover {
  height: 180px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-card:hover .card-image {
  transform: scale(1.05);
}

.course-card-info {
  padding: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #999;
}

.card-rating {
  color: #FFD700;
  font-weight: 500;
}

.card-price {
  text-align: right;
}

.price-value {
  font-size: 18px;
  font-weight: 600;
  color: #ff6b6b;
}

.price-free {
  font-size: 14px;
  color: #5074FF;
  padding: 2px 8px;
  background-color: #f0f3ff;
  border-radius: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .result-item {
    flex-direction: column;
  }
  
  .course-cover {
    width: 100%;
    height: 200px;
  }
  
  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .course-card-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>