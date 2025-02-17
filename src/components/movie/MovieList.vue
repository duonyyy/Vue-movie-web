<template>
  <div class="movie-list">
    <swiper class="w-full" :grab-cursor="true" :slides-per-view="slidesPerView" :space-between="16">
      <swiper-slide v-for="(movie, index) in movies" :key="index">
        <movie-card :movie="movie"></movie-card>
      </swiper-slide>
    </swiper>
  </div>
</template>



<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import MovieCard from './MovieCard.vue'
import 'swiper/scss'
import { ref } from 'vue'
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieSimilar
} from '../../config/api'

export default {
  components: { MovieCard, Swiper, SwiperSlide },
  props: {
    type: {
      type: String,
      required: true
    },
    movieId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const movies = ref([])

    const fetchMoviesData = async () => {
      if (props.type === 'popular') {
        movies.value = await fetchPopularMovies()
      } else if (props.type === 'now_playing') {
        movies.value = await fetchNowPlayingMovies()
      } else if (props.type === 'top_rated') {
        movies.value = await fetchTopRatedMovies()
      } else if (props.type === 'upcoming') {
        movies.value = await fetchUpcomingMovies()
      } else if (props.type === 'similar') {
        movies.value = await fetchMovieSimilar(props.movieId)
      }
    }

    fetchMoviesData()

    return {
      slidesPerView: 'auto',
      movies
    }
  }
}
</script>

