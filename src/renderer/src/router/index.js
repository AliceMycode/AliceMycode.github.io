import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  mode: 'hash',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/main',
      redirect: '/chat',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/views/chat/Chat.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          redirect: '/contact/blank',
          component: () => import('@/views/contact/Contact.vue'),
          children: [
            {
              path: 'blank',
              bane: 'blank',
              component: () => import('@/views/contact/BlankPage.vue')
            },
            {
              path: 'search',
              bane: 'search',
              component: () => import('@/views/contact/search.vue')
            }
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/Setting.vue')
        }
      ]
    }
  ]
})
export default router
