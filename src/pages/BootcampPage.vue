<template>
  <div class="px-24 pb-12 flex flex-col">
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
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold mt-16">FAQ</h1>
      <div
        v-for="(faq, index) in faqData"
        :key="index"
        class="mb-4 mt-2 flex flex-col gap-2"
      >
        <div class="font-semibold">{{ faq.tanya }}</div>
        <div class="text-gray-500">{{ faq.jawab }}</div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import KelasCard from "../components/KelasCard.vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import { store } from "../store/store";
export default {
  name: "BootcampPage",
  components: { KelasCard },
  data() {
    return {
      dataKelas: [],
      faqData: [
        {
          tanya: "Apakah peserta harus membawa laptop sendiri?",
          jawab:
            "Ya, setiap peserta di Axcelio harus membawa laptop dengan spesifikasi yang disarankan",
        },
        {
          tanya:
            "Apakah bisa mengikuti kursus di Axcelio di luar jadwal bootcamp yang tersedia?",
          jawab:
            "Bisa. Kamu bisa mengikuti kelas private apabila ingin mengikuti kelas di luar jadwal bootcamp.",
        },
        {
          tanya: "Bagaimana cara mengikuti kelas private di Axcelio?",
          jawab:
            "Hubungi Marketing Axcelio untuk memesan kelas private melalui email atau Whatsapp",
        },
        {
          tanya: "Apakah kelas offline tersedia di luar Denpasar?",
          jawab:
            "Untuk menjaga kualitas layanan pembelajaran, Axcelio saat ini hanya bisa di area Denpasar dan Bali.",
        },
        {
          tanya:
            "Saya tidak yakin harus memilih kelas apa. Apakah bisa konsultasi sebelum memutuskan mengikuti kelas?",
          jawab:
            "Ya, kamu bisa mengikuti sesi konsultasi dengan pengajar dan mentor",
        },
        {
          tanya: "Bagaimana cara mengikuti sesi konsultasi?",
          jawab:
            "Hubungi Marketing Axcelio untuk menjadwalkan sesi konsultasi dengan mentor Axcelio.",
        },
        {
          tanya: "Apakah sesi konsultasi dikenakan biaya?",
          jawab: "Tidak, sesi konsultasi GRATIS.",
        },
      ],
    };
  },
  methods: {
    async getData() {
      const toast = useToast();
      try {
        if (store.getters.getBootcampList == false) {
          const fetchData = await axios.get("https://axcelio.id/api/kelas");
          if (fetchData && fetchData.data.status == "success") {
            this.dataKelas = fetchData?.data.data;
            store.commit("setBootcampList", this.dataKelas);
          } else {
            toast.error("Maaf, gagal load data.", {
              timeout: 2000,
            });
          }
        } else {
          this.dataKelas = store.getters.getBootcampList;
        }
      } catch (error) {
        toast.error("Maaf, gagal load data.", {
          timeout: 2000,
        });
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
