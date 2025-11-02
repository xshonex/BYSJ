import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: '首页 - 刘传濠的个人学习资料系统'
    }
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('@/pages/Learn.vue'),
    meta: {
      title: '学习 - 刘传濠的个人学习资料系统'
    }
  },
  // {\n  //   path: '/me',\n  //   name: 'Me',\n  //   component: () => import('@/pages/Me.vue'),\n  //   meta: {\n  //     title: '我的 - 刘传濠的个人学习资料系统'\n  //   }\n  // },
  {
    path: '/course/:id',
    name: 'CourseDetail',
    component: () => import('@/pages/CourseDetail.vue'),
    props: true,
    meta: {
      title: '课程详情 - 刘传濠的个人学习资料系统'
    }
  },
  // {\n  //   path: '/search',\n  //   name: 'Search',\n  //   component: () => import('@/pages/Search.vue'),\n  //   meta: {\n  //     title: '搜索 - 刘传濠的个人学习资料系统'\n  //   }\n  // },
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
  document.title = to.meta.title || '刘传濠的个人学习资料系统'
  next()
})

export default router