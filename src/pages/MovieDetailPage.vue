<template>
  <div class="pb-10 page-container" :class="{ dark: isDark }">
    <div class="w-full h-[600px] relative">
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
      <div
        class="w-full h-full bg-cover bg-no-repeat"
        :style="{ backgroundImage: `url(${backgroundImageUrl})` }"
      ></div>
    </div>
    <div class="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
      <img :src="posterImageUrl" class="w-full h-full object-cover rounded-lg" alt="" />
    </div>
    <h1 class="text-center text-3xl font-bold mb-10">{{ title }}</h1>
    <div class="flex items-center justify-center gap-x-5 mb-10">
      <span
        class="py-2 px-4 border-primary border text-primary rounded-md"
        v-for="(genre, index) in genres"
        :key="index"
        >{{ genre.name }}</span
      >
    </div>
    <p class="text-center leading-relaxed max-w-[600px] mx-auto mb-10">{{ overView }}</p>
    <div class="casts mb-10">
      <h2 class="text-center text-3xl mb-10">Casts</h2>
      <div class="grid grid-cols-4 gap-5">
        <div class="cast-item" v-for="(cast, index) in casts.slice(0, 8)" :key="index">
          <img :src="getProfileImageUrl(cast.profile_path)" alt="cast_image" class="w-full" />
          <h2 class="text-xl font-medium">{{ cast.name }}</h2>
        </div>
      </div>
    </div>
    <div class="trailer flex flex-col gap-10 mb-10">
      <div class="trailer-item" v-for="(video, index) in keyVideos.slice(0, 3)" :key="index">
        <h3 class="mb-5 bg-secondary inline-block text-xl p-3 font-medium">{{ video.name }}</h3>
        <div class="w-full aspect-video">
          <iframe
            width="1049"
            height="599"
            :src="getKeyVideo(video)"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>
    </div>
    <Cmt></Cmt>
    <div class="similar">
      <h2 class="capitalize text-3xl mb-10">Similar movie</h2>
      <div class="movie-list grid grid-cols-4 gap-10 pb-10">
        <movie-card
          v-for="(movie, index) in similarMovies"
          :key="index"
          :movie="movie"
        ></movie-card>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/movie/MovieCard.vue' 
import Cmt from '../components/cmt/CmtLayout.vue'// Import component MovieCard.vue
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieVideo,
  fetchMovieSimilar
} from '../config/api' // Import các hàm để fetch dữ liệu từ API

export default {
  components: { MovieCard,Cmt }, // Khai báo component MovieCard cho component này
  data() {
    return {
      movieId: this.$route.params.movieId, // Lấy movieId từ route params
      backgroundImageUrl: '', // Đường dẫn hình ảnh nền
      title: '', // Tiêu đề phim
      posterImageUrl: '', // Đường dẫn hình ảnh poster
      overView: '', // Tóm tắt phim
      genres: [], // Thể loại
      casts: [], // Diễn viên
      profilePath: '', // Đường dẫn hình ảnh diễn viên
      keyVideos: [], // Key của video trailer
      similarMovies: [], // Danh sách phim tương tự
      isDark: false // Chế độ tối
    }
  },
  created() {
    this.fetchMovieData(this.movieId) // Fetch dữ liệu phim khi component được tạo
    this.scrollToTop() // Cuộn trang lên đầu
  },
  watch: {
    '$route.params.movieId': function (newMovieId) {
      this.fetchMovieData(newMovieId) // Fetch lại dữ liệu khi movieId thay đổi
      this.scrollToTop() // Cuộn trang lên đầu
    }
  },
  methods: {
    async fetchMovieData(movieId) { // Hàm để fetch dữ liệu phim
      try {
        await this.fetchMovieDetails(movieId) // Fetch chi tiết phim
        await this.fetchMovieCreditsData(movieId) // Fetch thông tin diễn viên
        await this.fetchMovieVideo(movieId) // Fetch video trailer
        await this.fetchMovieSimilar(movieId) // Fetch danh sách phim tương tự
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMovieDetails(movieId) { // Fetch chi tiết phim
      try {
        const movie = await fetchMovieDetails(movieId) // Gọi hàm fetchMovieDetails từ API

        const backdropPath = movie.backdrop_path
        const titleMovie = movie.title
        const posterPath = movie.poster_path
        const overView = movie.overview
        const genres = movie.genres

        this.backgroundImageUrl = `https://image.tmdb.org/t/p/original/${backdropPath}` // Gán đường dẫn hình nền
        this.posterImageUrl = `https://image.tmdb.org/t/p/original/${posterPath}` // Gán đường dẫn hình poster
        this.title = titleMovie // Gán tiêu đề phim
        this.overView = overView // Gán tóm tắt phim
        this.genres = genres // Gán thể loại
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMovieCreditsData(movieId) { // Fetch thông tin diễn viên
      try {
        const movie = await fetchMovieCredits(movieId) // Gọi hàm fetchMovieCredits từ API

        const casts = movie.cast // Lấy danh sách diễn viên

        this.casts = casts // Gán danh sách diễn viên
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMovieVideo(movieId) { // Fetch video trailer
      try {
        const movie = await fetchMovieVideo(movieId) // Gọi hàm fetchMovieVideo từ API

        const keyVideos = movie.results // Lấy key của video

        this.keyVideos = keyVideos // Gán key của video
      } catch (error) {
        console.log(error)
      }
    },
    async fetchMovieSimilar(movieId) { // Fetch danh sách phim tương tự
      try {
        const movie = await fetchMovieSimilar(movieId) // Gọi hàm fetchMovieSimilar từ API
        const similarMovies = movie.results // Lấy danh sách phim tương tự
        console.log(similarMovies)
        this.similarMovies = similarMovies // Gán danh sách phim tương tự
      } catch (error) {
        console.log(error)
      }
    },
    getProfileImageUrl(profilePath) { // Lấy đường dẫn hình ảnh của diễn viên
      if (profilePath) {
        return `https://image.tmdb.org/t/p/original/${profilePath}`
      }
      return ''
    },
    getKeyVideo(video) { // Lấy đường dẫn video trailer
      if (video && video.key) {
        return `https://www.youtube.com/embed/${video.key}`
      }
      return ''
    },
    toggleDark() { // Chuyển đổi chế độ tối
      this.isDark = !this.isDark
    },
    scrollToTop() { // Cuộn trang lên đầu
      window.scrollTo(0, 0)
    }
  }
}
</script>


<style scoped>
/* Add your custom styles here */
.movie-list {
  max-width: 1200px; /* Set max width for the movie list */
  margin-left: auto; /* Center the movie list horizontally */
  margin-right: auto;
}

@media (min-width: 640px) {
  .movie-list {
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* Show 4 columns on medium screens and above */
  }
}
</style>

