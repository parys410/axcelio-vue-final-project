<template>
  <div
    class="border cursor-pointer rounded-md overflow-hidden relative hover:shadow-lg"
    @click="goToDetail(data.slug)"
  >
    <div
      :style="{
        background: `url('${data.thumbnail}') no-repeat`,
        backgroundSize: 'cover',
      }"
      class="h-40"
    ></div>
    <div
      class="icon px-2 py-1 rounded-lg status text-white font-semibold text-sm"
      :class="
        data.status_pelaksanaan == 'online' ? 'bg-green-600' : 'bg-red-600'
      "
    >
      {{ data.status_pelaksanaan }}
    </div>
    <div class="flex flex-col py-4 mt-4 px-8 mb-6">
      <div>
        <h1 class="text-xl font-bold">{{ data.nama_program }}</h1>
      </div>
      <p class="text-sm">Level : {{ data.level }}</p>
      <div class="flex mt-2">
        <div class="text-xl font-semibold">
          Rp {{ biaya }}
          <span class="text-gray-500 font-normal line-through">{{
            biayaCoret
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "KelasCard",
  props: {
    data: Object,
  },
  data() {
    return {
      biaya: 0,
      biayaCoret: 0,
    };
  },
  methods: {
    goToDetail(slug) {
      this.$router.push({
        name: "DetailProgram",
        params: { slug },
      });
    },
  },
  mounted() {
    this.biaya = this.data.biaya.toLocaleString();
    this.biayaCoret = this.data.harga_coret.toLocaleString();
  },
};
</script>
<style scoped>
.status {
  position: absolute;
  right: 20px;
  top: 145px;
}
</style>
