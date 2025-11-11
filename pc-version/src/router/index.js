import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: '首页 - 建筑行业学习系统'
    }
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('@/pages/Learn.vue'),
    meta: {
      title: '学习 - 建筑行业学习系统'
    }
  },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: () => import('@/pages/CourseDetail.vue'),
    props: true,
    meta: {
      title: '课程详情 - 建筑行业学习系统'
    }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '建筑行业学习系统'
  next()
})

export default router