const headUrl = 'https://api.themoviedb.org/3/movie'
const API_KEY = '1e736f7376d8b7f90a66c1431257159b'


//fetchPopularMovies: Hàm này gọi API để lấy danh sách các bộ phim phổ biến. Nó sử dụng địa chỉ API "/popular" của TMDb.
export const fetchPopularMovies = async () => {
  try {
    const apiUrl = `${headUrl}/popular?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
// fetchNowPlayingMovies: Hàm này gọi API để lấy danh sách các bộ phim đang chiếu. 
//Nó sử dụng địa chỉ API "/now_playing" của TMDb và nhận thêm một tham số page để xác định trang dữ liệu cụ thể.
export const fetchNowPlayingMovies = async (page) => {
  try {
    const apiUrl = `${headUrl}/now_playing?api_key=${API_KEY}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
//fetchTopRatedMovies: Hàm này gọi API để lấy danh sách các bộ phim được đánh giá cao nhất.
// Nó sử dụng địa chỉ API "/top_rated" của TMDb.
export const fetchTopRatedMovies = async () => {
  try {
    const apiUrl = `${headUrl}/top_rated?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
//fetchUpcomingMovies: Hàm này gọi API để lấy danh sách các bộ phim sắp ra mắt.
// Nó sử dụng địa chỉ API "/upcoming" của TMDb.
export const fetchUpcomingMovies = async () => {
  try {
    const apiUrl = `${headUrl}/upcoming?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
//fetchMovieDetails: Hàm này gọi API để lấy thông tin chi tiết về một bộ phim cụ thể,
// dựa trên ID của bộ phim.
export const fetchMovieDetails = async (movieId) => {
  try {
    const apiUrl = `${headUrl}/${movieId}?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
//fetchMovieCredits: Hàm này gọi API để lấy thông tin về những người tham gia trong một bộ phim cụ thể,
// dựa trên ID của bộ phim.
export const fetchMovieCredits = async (movieId) => {
  try {
    const apiUrl = `${headUrl}/${movieId}/credits?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
//fetchMovieVideo: Hàm này gọi API để lấy video liên quan đến một bộ phim cụ thể, 
//dựa trên ID của bộ phim.
export const fetchMovieVideo = async (movieId) => {
  try {
    const apiUrl = `${headUrl}/${movieId}/videos?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
//fetchMovieSimilar: Hàm này gọi API để lấy danh sách các bộ phim tương tự với một bộ phim cụ thể, dựa trên ID của bộ phim.
export const fetchMovieSimilar = async (movieId) => {
  try {
    const apiUrl = `${headUrl}/${movieId}/similar?api_key=${API_KEY}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
//searchMovie: Hàm này gọi API để tìm kiếm các bộ phim dựa trên một chuỗi tìm kiếm cụ thể, 
//với sự hỗ trợ của tham số page để xác định trang dữ liệu cụ thể.
export const searchMovie = async (query, page) => {
  try {
    const encodedQuery = encodeURIComponent(query)
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
//nextListMovie: Hàm này tương tự như fetchNowPlayingMovies 
//nhưng chú trọng vào việc lấy danh sách bộ phim đang chiếu và nhận tham số page để xác định trang dữ liệu cụ thể.
export const nextListMovie = async (page) => {
  try {
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.log(error)
    return []
  }
}
//