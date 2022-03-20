<template>
  <div class="flex flex-col px-24 py-8">
    <div class="breadcrumb text-sm mb-16">
      <router-link class="" to="/">Home</router-link>
      /
      <span>
        <router-link class="" to="/bootcamp">Bootcamp</router-link>
      </span>
      /
      <span class="text-gray-400">{{ detailBootcamp.nama_kelas }}</span>
    </div>
    <div class="detail-header justify-center items-center flex flex-col gap-2">
      <div
        class="rounded-full h-36 w-36 mb-4"
        :style="{
          background: `url('${detailBootcamp.banner}') no-repeat`,
          backgroundSize: 'cover',
        }"
      ></div>
      <div>
        <h1 class="text-2xl text-blue-500 font-bold">
          {{ detailBootcamp.nama_kelas }}
        </h1>
      </div>
      <p>
        {{ detailBootcamp.deskripsi_singkat }}
      </p>
    </div>
    <div class="paket-belajar mt-16 flex flex-col justify-center items-center">
      <div class="text-3xl font-bold">Pilih Paket Belajar</div>
      <div>Sesuaikan minat dengan harga terjangkau</div>
    </div>
    <div class="mt-8 grid grid-cols-3 gap-4">
      <program-card
        v-for="program in detailBootcamp.program"
        :key="program.id_program"
        :data="program"
      ></program-card>
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import ProgramCard from "../components/ProgramCard.vue";
import axios from "axios";
export default {
  name: "DetailBootcamp",
  components: { ProgramCard },
  data() {
    return {
      detailBootcamp: [],
    };
  },
  methods: {
    async getData(slug) {
      const toast = useToast();
      try {
        const fetchData = await axios.get(
          "https://axcelio.id/api/kelas/" + slug
        );
        if (fetchData && fetchData.data.status == "success") {
          this.detailBootcamp = fetchData?.data.data;
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
    },
  },
  mounted() {
    this.getData(this.$route?.params?.slug);
  },
};
</script>
