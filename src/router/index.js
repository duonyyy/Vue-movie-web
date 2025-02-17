import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MoviePage from '../pages/MoviePage.vue'
import MovieDetailPage from '../pages/MovieDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviePage
    },
    {
      path: '/movies/:movieId',
      name: 'movieDetail',
      component: MovieDetailPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    }
  ]
})

export default router
