import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

import CategoryView from '@/views/category/CategoryView.vue'
import AddCategory from '@/views/category/AddCategory.vue'
import EditCategory from '@/views/category/EditCategory.vue'
import NotFound from '@/views/NotFound.vue'


const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/category/add',
    name: 'addCategory',
    component: AddCategory
  },
  {
    path: '/category/edit/:id',
    name: 'editCategory',
    component: EditCategory
  },

  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
