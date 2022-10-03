import Vue from 'vue'
import VueRouter from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router'

Vue.use(VueRouter)

// import example from './example'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'quote',
      component: () => import('../views/quote')
    }
  ]
})

// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         {
//             path: '/',
//             name: 'quote',
//             component: () => import('../views/quote.vue')
//         }
//     ]
// })

export default router