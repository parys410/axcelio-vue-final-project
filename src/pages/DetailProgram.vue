<template>
  <div class="flex flex-col">
    <div class="header bg-gray-900 px-24 py-8">
      <div class="breadcrumb text-sm mb-16 text-gray-400">
        <router-link class="" to="/bootcamp">Bootcamp</router-link>
        /
        <span
          class="hover:text-blue-600 hover:cursor-pointer"
          @click="goToBootcamp(prevSlug)"
        >
          {{ namaKelas }}
        </span>
        /
        <span class="text-yellow-400">{{ dataProgram.nama_program }}</span>
      </div>
      <div class="text-yellow-400 text-4xl font-semibold">
        <h1 class="flex items-center gap-2">
          {{ dataProgram.nama_program }}
          <span
            class="text-sm rounded-md text-white font-normal py-1 px-2"
            :class="
              dataProgram.status_pelaksanaan == 'online'
                ? 'bg-green-600'
                : 'bg-red-600'
            "
            >{{ dataProgram.status_pelaksanaan }}</span
          >
        </h1>
        <p class="text-lg text-gray-400 font-light">
          Level : {{ dataProgram.level }}
        </p>
        <p class="text-gray-400 mt-1 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="font-light ml-2">Update terakhir {{ updatedAt }}</span>
        </p>
      </div>
    </div>
    <div class="main mt-8 flex px-24 py-8 gap-4 justify-start items-start">
      <div class="w-3/5 bg-white">
        <div class="font-semibold text-xl">Tentang Program</div>
        <div
          class="silabus border border-gray-300 p-6 rounded-md mt-4 leading-relaxed"
          v-html="silabus"
        ></div>
      </div>
      <div
        class="border border-gray-300 rounded-md overflow-hidden relative w-2/5"
      >
        <div
          :style="{
            background: `url('${dataProgram.thumbnail}') no-repeat`,
            backgroundSize: 'cover',
          }"
          class="h-60"
        ></div>
        <div class="p-4">
          <div
            class="flex flex-col justify-center items-center bg-yellow-500 p-2 rounded"
          >
            <span class="text-sm">Pelaksanaan Bootcamp</span>
            <span class="text-gray-900 font-semibold"
              >{{ periodeMulai }} <span class="font-normal mx-1">sampai</span>
              {{ periodeSelesai }}</span
            >
          </div>
        </div>
        <div class="flex flex-col mt-2 px-4 pb-4 justify-center">
          <div class="font-normal text-md">Biaya</div>
          <div class="text-2xl font-semibold">
            Rp {{ biaya }}
            <span class="text-xl text-gray-500 font-normal line-through">{{
              biayaCoret
            }}</span>
          </div>
          <div class="mt-2">
            {{ dataProgram.jumlah_pertemuan }}x pertemuan -
            {{ dataProgram.durasi_jam }} menit
          </div>
          <div class="mt-4 text-sm font-semibold">Program ini disertai:</div>
          <div>
            <div
              class="text-sm flex items-center py-1 gap-1"
              v-for="(layanan, index) in dataProgram.daftar_layanan"
              :key="index"
            >
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
              ></span>
              {{ layanan }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-24">
      <h1 class="text-xl font-semibold">Coba kelas lainnya</h1>
    </div>
    <div class="px-24 pt-2 pb-8 grid grid-cols-3 gap-4">
      <program-card
        v-for="program in dataProgram.related"
        :key="program.id_program"
        :data="program"
      ></program-card>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { useToast } from "vue-toastification";
import axios from "axios";
import ProgramCard from "../components/ProgramCard.vue";
export default {
  name: "DetailProgram",
  components: { ProgramCard },
  data() {
    return {
      dataProgram: [],
      prevSlug: "",
      namaKelas: "",
      updatedAt: "",
      silabus: "",
      periodeMulai: "",
      periodeSelesai: "",
      biaya: "",
      biayaCoret: "",
    };
  },
  methods: {
    getData(slug) {
      const toast = useToast();
      dayjs.extend(localizeFormat);
      axios
        .get("https://axcelio.id/api/program/" + slug)
        .then((response) => {
          this.dataProgram = response.data.data;
          this.prevSlug = this.dataProgram.kelas?.slug;
          this.namaKelas = this.dataProgram.kelas?.nama_kelas;
          this.silabus = this.dataProgram.silabus;
          this.updatedAt = dayjs(this.dataProgram.updated_at).format(
            "DD/MMM/YYYY HH:mm:ss"
          );

          this.periodeMulai = dayjs(this.dataProgram.tanggal_mulai).format(
            "DD/MMM/YYYY"
          );
          this.periodeSelesai = dayjs(this.dataProgram.tanggal_selesai).format(
            "DD/MMM/YYYY"
          );
          this.biaya = this.dataProgram.biaya.toLocaleString();
          this.biayaCoret = this.dataProgram.harga_coret.toLocaleString();
        })
        .catch((e) => {
          toast.error("Maaf, gagal load data.", {
            timeout: 2000,
          });
        });
    },
    goToBootcamp(slug) {
      this.$router.push({
        name: "DetailBootcamp",
        params: { slug },
      });
    },
  },
  mounted() {
    this.getData(this.$route.params.slug);
  },
  watch: {
    $route(to, from) {
      if (to.name == "DetailProgram") {
        this.getData(to.params.slug);
      }
    },
  },
};
</script>
<style scoped>
.silabus ::v-deep(hr) {
  margin-top: 10px;
  margin-bottom: 10px;
}
.silabus ::v-deep(p) {
  font-size: 12pt;
}
.silabus ::v-deep(h1) {
  font-size: 16pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.silabus ::v-deep(h2) {
  font-size: 14pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.silabus ::v-deep(h3) {
  font-size: 12pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.silabus ::v-deep(li) {
  font-size: 12pt;
  list-style-type: disc;
  margin-left: 24px;
}
</style>
