<template>
  <div class="footer flex flex-col px-24 text-gray-300 py-5">
    <div class="flex py-4 justify-between">
      <div class="flex gap-28">
        <div>
          <div><h1 class="font-bold">Axcelio</h1></div>
          <div class="text-sm flex flex-col font-light">
            <span>Jalan Gatot Subroto No. 388b</span>
            <span>Denpasar, Bali, Indonesia</span>
            <span>+62 813-5324-7370</span>
            <span>learn@axcelio.id</span>
          </div>
        </div>
        <div class="flex flex-col">
          <h1 class="font-bold">Navigasi</h1>
          <div class="text-sm py-2">
            <router-link class="" to="/bootcamp">Bootcamp</router-link>
          </div>
          <div class="text-sm py-2">
            <router-link class="" to="/blog">Blog</router-link>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://axcelio.id/assets/images/logo.png"
          alt="logo"
          width="100"
        />
      </div>
    </div>
    <div class="pb-4 text-xs text-gray-400">
      <hr class="mb-2" />
      <div>©2021 Axcelio | All rights reserved</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WebFooter",
};
</script>
<style scoped>
.footer {
  background: #1f2937;
}
</style>
