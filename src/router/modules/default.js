const DEFAULT = [{
  path: '/',
  component: () => import('@/views/layout/DefaultLayoutPage.vue'),
  redirect: { path: '/home' },
  meta: {
    order: 0
  },
  children: [
    {
      path: 'home',
      name: 'homePage',
      component: () => import('@/views/home/HomePage.vue'),
      // role: ["user", "admin"],
      meta: {
        title: '首页',
        order: 0
      }
    },
    {
      path: 'recommendation',
      name: 'recommendationPage',
      component: () => import('@/views/home/HomePage.vue'),
      // role: ["user", "admin"],
      meta: {
        title: '推荐',
        order: 1
      }
    },
    {
      path: 'following',
      name: 'followingPage',
      component: () => import('@/views/home/HomePage.vue'),
      // role: ["user", "admin"],
      meta: {
        title: '关注',
        order: 2
      }
    },
    {
      path: 'mine',
      name: 'minePage',
      component: () => import('@/views/home/HomePage.vue'),
      meta: {
        title: '我的',
        order: 3
      }
    }
  ]
}];
export default DEFAULT;
