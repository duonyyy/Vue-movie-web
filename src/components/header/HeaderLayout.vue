<template>
  <div class="page-container">
    <header class="header flex justify-between items-center py-10 mb-5">
      <div class="header-left gap-x-5 flex items-center">
        <router-link
          to="/"
          :class="[isActiveLink('home') ? 'text-primary font-bold' : '', isDark ? 'dark' : '']"
        >
          <i class="fa fa-home text-2xl pr-1" aria-hidden="true"></i>
          <span class="text-lg pr-5">Home</span>
        </router-link>
        <router-link
          to="/movies"
          :class="[isActiveLink('movies') ? 'text-primary font-bold' : '', isDark ? 'dark' : '']"
        >
          <i class="fa fa-film text-2xl pr-1" aria-hidden="true"></i>
          <span class="text-lg">Movies</span>
        </router-link>
      </div>
      <div class="header-right flex items-center">
        <i
          :class="['fa', isDark ? 'fa-sun-o' : 'fa-moon-o', 'cursor-pointer']"
          aria-hidden="true"
          @click="toggleDark"
        ></i>
        <router-link
          v-if="!loggedIn"
          to="/login"
          :class="isActiveLink('login') ? 'text-primary font-bold' : ''"
          class="ml-8"
        >
          <span class="text-lg">Login</span>
        </router-link>
        <router-link
          v-if="!loggedIn"
          to="/register"
          :class="
            isActiveLink('register')
              ? 'text-primary bg-primary border-none text-white font-bold'
              : ''
          "
          class="text-lg ml-5 py-2 px-6 border rounded-3xl"
          >Register</router-link
        >
        <div v-if="loggedIn" class="flex items-center">
          <i class="fa fa-user-circle-o text-2xl pl-5" aria-hidden="true"></i>
          <span class="text-lg pl-1">{{ email }}</span>
          <button
            class="text-lg ml-5 py-2 px-6 border-none bg-slate-600 border rounded-3xl"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { auth } from '../../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const isDark = ref(false)

    const toggleDark = () => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }

    const isActiveLink = (routeName) => {
      return route.name === routeName
    }
  //////////////////////////////////////////
    const email = ref('')
    const loggedIn = ref(false)
    const router = useRouter()

    const logout = () => {
      auth.signOut()
      router.push('/') // day ve Home
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        email.value = user.email
        loggedIn.value = true
      } else {
        email.value = ''
        loggedIn.value = false
      }
    })

    return {
      isActiveLink,
      email,
      loggedIn,
      logout,
      isDark,
      toggleDark
    }
  }
}
</script>
