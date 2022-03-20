<template>
  <div class="header px-20 py-2 bg-white">
    <div class="flex justify-between items-center h-full">
      <div class="flex gap-4 items-center">
        <span>
          <img src="../assets/svg/logo.svg" alt="logo-axcelio" width="32" />
        </span>
        <h1 class="text-xl font-bold pt-2">{{ webTitle }}</h1>
        <div class="nav flex h-full pt-2 ml-8 gap-8">
          <router-link class="" to="/">Home</router-link>
          <router-link class="" to="/bootcamp">Bootcamp</router-link>
          <router-link class="" to="/blog">Blog</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebHeader",
  props: {
    webTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  height: 64px;
  position: relative;
  z-index: 10;
}
.router-link-active,
.router-link-exact-active {
  text-decoration: none;
  color: rgb(52, 109, 219);
}
</style>
