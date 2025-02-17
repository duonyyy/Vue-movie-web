<template>
  <div>
    <header-layout></header-layout>
    <router-view></router-view>
    <!-- <footer-layout></footer-layout> -->
  </div>
</template>

<script>
import HeaderLayout from './components/header/HeaderLayout.vue'
import FooterLayout from './components/footer/FooterLayout.vue'

export default {
  components: { HeaderLayout, FooterLayout },
  setup() {}
}
</script>

<style scoped></style>
