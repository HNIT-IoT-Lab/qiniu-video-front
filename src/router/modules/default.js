const DEFAULT = [
  {
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
          order: 0,
          icon: 'home',
          iconfill: 'home_fill'
        }
      },
      {
        path: 'recommendation',
        name: 'recommendationPage',
        component: () => import('@/views/recommendation/recommendationPage.vue'),
        // role: ["user", "admin"],
        meta: {
          title: '推荐',
          order: 1,
          icon: 'favor_light',
          iconfill: 'favor_fill_light'
        }
      },
      {
        path: 'following',
        name: 'followingPage',
        component: () => import('@/views/home/HomePage.vue'),
        // role: ["user", "admin"],
        meta: {
          title: '关注',
          order: 2,
          icon: 'friend_add',
          iconfill: 'friend_add_fill'
        }
      },
      {
        path: 'mine',
        name: 'minePage',
        component: () => import('@/views/mine/MinePage.vue'),
        meta: {
          title: '我的',
          order: 3,
          icon: 'people',
          iconfill: 'people_fill'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/login'
  }
];
export default DEFAULT;
