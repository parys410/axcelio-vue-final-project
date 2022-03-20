<template>
  <div class="flex flex-col px-24 py-8">
    <div class="h-full flex justify-between">
      <div class="flex justify-center items-start flex-col gap-4 relative">
        <div class="text-4xl font-extrabold marketingtext relative-10">
          Belajar coding dan design
          <span class="text-yellow-300">dari nol</span>.
        </div>
        <div class="text-4xl font-extrabold marketingtext relative-10">
          Praktis dan
          <span class="text-yellow-300">berorientasi industri</span>.
        </div>
        <div class="text-4xl font-extrabold marketingtext relative-10">
          <span class="text-yellow-300">Tanpa batasan</span> latar belakang dan
          usia.
        </div>
        <div class="bg-blue-200 relative-10 py-2 px-4">
          Online & Offline Bootcamp
        </div>
        <img
          src="../assets/svg/patternpad-3.svg"
          alt="logo"
          width="1000"
          class="bg-2"
        />
      </div>
      <div class="illustration">
        <img
          src="../assets/img/char.png"
          alt="char"
          width="500"
          class="relative-10"
        />
        <div class="bg-1 bg-hideaut"></div>
      </div>
    </div>
    <div class="mt-16 flex flex-col" ref="kelas">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold mt-8 text-center text-blue-400">
          Pilih Bootcamp
        </h1>
        <p>Gabung ke bootcamp yang sesuai dengan Minat dan Tujuan</p>
      </div>
      <div class="pt-8">
        <div class="grid grid-cols-3 gap-4">
          <kelas-card
            v-for="kelas in dataKelas"
            :key="kelas.id_kelas"
            :data="kelas"
          ></kelas-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import KelasCard from "../components/KelasCard.vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { store } from "../store/store.js";
export default {
  name: "Homepage",
  components: { KelasCard },
  data() {
    return {
      dataKelas: [],
    };
  },
  methods: {
    async getData() {
      const toast = useToast();
      if (store.getters.getBootcampList == false) {
        try {
          const fetchData = await axios.get("https://axcelio.id/api/kelas");
          if (fetchData && fetchData.data.status == "success") {
            this.dataKelas = fetchData?.data.data;
            store.commit("setBootcampList", this.dataKelas);
          } else {
            toast.error("Maaf, gagal load data.", {
              timeout: 2000,
            });
          }
        } catch (error) {
          toast.error("Maaf, gagal load data.", {
            timeout: 2000,
          });
        }
      } else {
        this.dataKelas = store.getters.getBootcampList;
      }
    },
    goto(refName) {
      const element = this.$refs[refName.split("#")[1]];
      const top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  mounted() {
    if (this.$route.hash) {
      this.goto(this.$route.hash);
    }
    this.getData();
  },
};
</script>
<style scoped>
.marketingtext {
  width: 500px;
}
.bg-hideaut {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23cbd5e1' fill-opacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.illustration {
  position: relative;
}
.relative-10 {
  position: relative;
  z-index: 10;
}
.bg-1 {
  position: absolute;
  right: 50px;
  top: 80px;
  z-index: 1;
  width: 300px;
  height: 300px;
  transform: rotate(30deg);
}
.bg-2 {
  position: absolute;
  left: -260px;
  top: -100px;
  opacity: 0.3;
  transform: rotate(90deg);
}
</style>
