<template>
  <div
    class="border cursor-pointer rounded-md overflow-hidden relative hover:shadow-lg"
    @click="goToDetail(data.slug)"
  >
    <div
      :style="{
        background: `url('${data.banner}') no-repeat`,
        backgroundSize: 'cover',
      }"
      class="h-40"
    ></div>
    <div class="icon border-4 border-white rounded-lg">
      <img :src="data.icon" alt="src" width="80" class="" />
    </div>
    <div class="flex flex-col py-4 mt-8 px-8 mb-8">
      <div>
        <h1 class="text-xl font-bold">{{ data.nama_kelas }}</h1>
      </div>
      <div class="text-base mt-2" v-html="data.deskripsi_singkat"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "KelasCard",
  props: {
    data: Object,
  },
  methods: {
    goToDetail(slug) {
      this.$router.push({
        name: "DetailBootcamp",
        params: { slug },
      });
    },
  },
};
</script>
<style scoped>
.icon {
  position: absolute;
  left: 20px;
  top: 100px;
  background: white;
  overflow: hidden;
}
</style>
