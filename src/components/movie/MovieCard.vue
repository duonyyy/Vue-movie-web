<template>
  <div class="h-full movie-card flex flex-col rounded-lg p-3 bg-slate-800 select-none text-white">
    <img :src="getMoviePosterUrl()" alt="" class="w-full h-auto object-cover rounded-lg mb-5" />
    <div class="flex flex-col flex-1">
      <h3 class="font-bold text-xl mb-3">{{ movie.title }}</h3>
      <div class="flex items-center justify-between text-sm opacity-50 mb-10">
        <span>{{ getYear() }}</span>
        <span>{{ movie.vote_average }}⭐</span>
      </div>
      <router-link
        v-if="loggedIn"
        :to="getMovieDetail(movie)"
        class="mt-auto py-3 px-6 rounded-lg capitalize bg-primary w-full"
      >
        <span class="flex justify-center">Watch now</span>
      </router-link>
      <router-link
        v-else
        to="/login"
        class="mt-auto py-3 px-6 rounded-lg capitalize bg-primary w-full"
      >
        <span class="flex justify-center">Watch now</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default {
  props: ['movie'],
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isActiveLink = (routeName) => {
      return route.name === routeName
    }

    const loggedIn = ref(false)

    onAuthStateChanged(auth, (user) => {
      loggedIn.value = !!user
    })

    const getMovieDetail = (movie) => {
      if (loggedIn.value) {
        return `/movies/${movie.id}`
      } else {
        router.push('/login')
      }
    }

    return {
      isActiveLink,
      loggedIn,
      getMovieDetail
    }
  },
  methods: {
    getMoviePosterUrl() {
      if (this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
      }
      return ''
    },
    getYear() {
      if (this.movie.release_date) {
        const releaseYear = new Date(this.movie.release_date).getFullYear()
        return releaseYear
      }
      return ''
    }
  }
}
</script>


