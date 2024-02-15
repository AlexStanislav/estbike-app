import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAppStore } from '@/stores/appStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/despre',
      name: 'despre',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rabla',
      name: 'rabla',
      component: () => import('../views/RablaView.vue')
    },
    {
      path: '/modele',
      name: 'modele',
      component: () => import('../views/ModelsView.vue')
    },
    {
      path: '/termeni',
      name: 'termeni',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('../views/CookiesView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('../views/ProductView.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('../views/ServiceView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  const header = document.querySelector('.desktop-nav') !== null ? document.querySelector('.desktop-nav') : false

  window.scrollTo(0, 0)

  if (header) {
    if (to.path !== '/') {
      header.classList.add('sticky')
    } else {
      header.classList.remove('sticky')
    }
  }
  
  if (to.path === '/') {
    if (appStore.firstLoadComplete) {
      appStore.togglePreloader()
      console.log('preload-toggle');
      setTimeout(() => {
        appStore.togglePreloader()
        console.log('preload-toggle');
      }, 1000);
    } else {
      if (to.path === '/modele') {
        next('/')
      }
    }
  } else {
    appStore.togglePreloader()
    setTimeout(() => {
      appStore.togglePreloader()
    }, 1000);
  }

  if (to.path === '/' && from.path === '/model') {
    setTimeout(() => {
      appStore.togglePreloader(false)
    }, 1001);
  }


  next()
})

export default router
