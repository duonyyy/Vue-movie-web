<template>
  <div class="page-container">
    <div class="flex mb-10">
      <div class="flex-1">
        <input
          type="text"
          class="w-full p-4 bg-slate-800 text-white outline-none"
          placeholder="Type here to search..."
          v-model="searchQuery"
          @keydown.enter="searchMovies"
        />
      </div>
      <button class="p-4 bg-primary text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
    <div class="movie-list grid grid-cols-4 gap-10 pb-10">
      <div v-for="(movie, index) in movies" :key="index">
        <movie-card :movie="movie"></movie-card>
      </div>
    </div>
    <div class="pb-20 flex justify-center">
      <button
        class="bg-slate-600 font-medium text-white rounded-md py-3 px-5"
        @click="loadNextPage"
      >
        Load more...
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue' // Import ref từ Vue để tạo reactive variables
import MovieCard from '../components/movie/MovieCard.vue' // Import component MovieCard.vue
import { fetchNowPlayingMovies, searchMovie } from '../config/api' // Import các hàm để fetch dữ liệu từ API

export default {
  components: { MovieCard }, // Khai báo component MovieCard cho component này
  setup() {
    const movies = ref([]) // Tạo một reactive variable movies để lưu danh sách các phim
    const searchQuery = ref('') // Tạo một reactive variable searchQuery để lưu trạng thái của ô tìm kiếm
    const page = ref(1) // Tạo một reactive variable page để lưu số trang hiện tại
    const nextPageAvailable = ref(false) // Tạo một reactive variable nextPageAvailable để kiểm tra xem trang tiếp theo có sẵn không

    const fetchMoviesData = async () => { // Hàm để fetch dữ liệu phim
      movies.value = await fetchNowPlayingMovies() // Gọi hàm fetchNowPlayingMovies từ API để lấy danh sách phim đang chiếu
      nextPageAvailable.value = true // Đánh dấu rằng trang tiếp theo có sẵn
    }

    const searchMovies = async () => { // Hàm để tìm kiếm phim
      if (searchQuery.value.trim() !== '') { // Kiểm tra xem trường tìm kiếm có được nhập không
        movies.value = await searchMovie(searchQuery.value, page.value) // Gọi hàm searchMovie từ API để tìm kiếm phim dựa trên từ khóa nhập vào
        nextPageAvailable.value = false // Đánh dấu rằng không có trang tiếp theo khi tìm kiếm
      } else {
        fetchMoviesData() // Nếu trường tìm kiếm trống, thực hiện fetchMoviesData để lấy danh sách phim đang chiếu
      }
    }

    const loadNextPage = async () => { // Hàm để tải trang kế tiếp của danh sách phim
      page.value++ // Tăng giá trị của biến page lên 1
      if (searchQuery.value.trim() !== '') { // Kiểm tra xem có đang trong quá trình tìm kiếm không
        const additionalMovies = await searchMovie(searchQuery.value, page.value) // Gọi hàm searchMovie từ API để lấy thêm danh sách phim trang tiếp theo
        movies.value = [...movies.value, ...additionalMovies] // Thêm danh sách phim mới vào danh sách phim hiện tại
        nextPageAvailable.value = additionalMovies.length > 0 // Đánh dấu rằng có trang tiếp theo nếu danh sách phim mới có ít nhất 1 phần tử
      } else {
        const additionalMovies = await fetchNowPlayingMovies(page.value) // Nếu không đang trong quá trình tìm kiếm, thực hiện fetch danh sách phim đang chiếu của trang tiếp theo
        movies.value = [...movies.value, ...additionalMovies] // Thêm danh sách phim mới vào danh sách phim hiện tại
        nextPageAvailable.value = additionalMovies.length > 0 // Đánh dấu rằng có trang tiếp theo nếu danh sách phim mới có ít nhất 1 phần tử
      }
    }

    fetchMoviesData() 
    return {
      movies,
      searchQuery,
      searchMovies,
      loadNextPage,
      nextPageAvailable
    }
  }
}
</script>
