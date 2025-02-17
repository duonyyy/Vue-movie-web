<template>
  <banner></banner>
  <section class="movies-layout page-container pb-20">
    <h2 class="capitalize mb-5 text-3xl font-bold light:text-white">Now playing</h2>
    <movie-list type="now_playing"></movie-list>
  </section>
  <section class="movies-layout page-container pb-20">
    <h2 class="capitalize mb-5 text-3xl font-bold light:text-white">Popular</h2>
    <movie-list type="popular"></movie-list>
  </section>
  <section class="movies-layout page-container pb-20">
    <h2 class="capitalize mb-5 text-3xl font-bold light:text-white">Top rated</h2>
    <movie-list type="top_rated"></movie-list>
  </section>
  <Footerlo></Footerlo>
</template>

<script>
import Banner from '../components/banner/Banner.vue'
import MovieList from '../components/movie/MovieList.vue'
import Footerlo from '../components/footer/FooterLayout.vue'

export default {
  components: { MovieList,
     Banner,
     Footerlo
     }
}
</script>
