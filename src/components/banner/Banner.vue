<template>
  <section class="banner h-[500px] page-container mb-10 overflow-hidden">
    <swiper :grab-cursor="true" slides-per-view="auto">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <banner-item :movie="movie"></banner-item>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import BannerItem from './BannerItem.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import { ref } from 'vue'
import { fetchUpcomingMovies } from '../../config/api'

export default {
  components: { BannerItem, Swiper, SwiperSlide },
  setup() {
    const movies = ref([])
    const fetchMoviesData = async () => {
      movies.value = await fetchUpcomingMovies()
    }
    fetchMoviesData()
    return {
      movies
    }
  }
}
</script>
