<template>
  <div class="w-full h-full relative rounded-lg overflow-hidden">
    <div class="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
    <img :src="getMoviePosterUrl()" class="absolute inset-0 w-full h-full object-cover object-center" alt="" />
    <div class="absolute left-5 bottom-5 w-full text-white">
      <h2 class="font-bold text-3xl mb-5">{{ movie.title }}</h2>
      <div class="flex items-center gap-x-3 mb-8">
        <span class="py-2 px-4 border border-white rounded-md">Action</span>
        <span class="py-2 px-4 border border-white rounded-md">Comedy</span>
        <span class="py-2 px-4 border border-white rounded-md">Fantasy</span>
      </div>

      <router-link :to="`/movies/${movie.id}`">
        <button class="py-3 px-6 rounded-lg bg-primary text-white font-medium">Watch now</button>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  props: ['movie'],
  methods: {
    getMoviePosterUrl() {
      if (this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
      }
      return ''
    }
  }
}
</script>
