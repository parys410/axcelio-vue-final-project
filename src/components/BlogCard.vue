<template>
  <div
    class="border rounded-md overflow-hidden relative hover:shadow-lg hover:cursor-pointer"
    @click="goToDetail(dataBlog.slug)"
  >
    <div
      :style="{
        background: `url('${dataBlog.thumbnail}') no-repeat`,
        backgroundSize: 'cover',
      }"
      class="h-40"
    ></div>
    <div class="flex flex-col py-4 mt-5 px-8 mb-8">
      <div>
        <h1 class="text-xl font-bold">{{ dataBlog.judul }}</h1>
      </div>
      <div class="text-sm mt-2">{{ plainDesc }}</div>
      <div class="penulis mt-4 flex items-center gap-4">
        <div
          class="rounded-full h-12 w-12"
          :style="{
            background: `url('${dataBlog.user.avatar}') no-repeat`,
            backgroundSize: 'cover',
          }"
        ></div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold">
            {{ dataBlog.user.nama_lengkap }}
          </div>
          <div class="text font-semibold text-gray-500">
            {{ dataBlog.user.bio }}
          </div>
          <div class="text-xs">{{ dateBlog }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { useToast } from "vue-toastification";
import axios from "axios";
export default {
  name: "BlogCard",
  props: {
    dataBlog: Object,
  },
  data() {
    return {
      dateBlog: "",
      detailBlog: null,
      plainDesc: "",
    };
  },
  methods: {
    getDate(dateString) {
      dayjs.extend(localizeFormat);
      this.dateBlog = dayjs(dateString).format("DD/MM/YYYY HH:mm A");
    },
    async getData(slug) {
      const toast = useToast();
      try {
        const fetchData = await axios.get(
          "https://axcelio.id/api/blog/" + slug
        );
        if (fetchData && fetchData.data.status == "success") {
          this.detailBlog = fetchData?.data?.data;
          this.plainDesc =
            this.convertToPlain(this.detailBlog.isi).substring(0, 150) + "...";
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
    convertToPlain(html) {
      // Create a new div element
      var tempDivElement = document.createElement("div");

      // Set the HTML content with the given value
      tempDivElement.innerHTML = html;

      // Retrieve the text property of the element
      return tempDivElement.textContent || tempDivElement.innerText || "";
    },
    goToDetail(slug) {
      this.$router.push({
        name: "DetailBlog",
        params: { slug },
      });
    },
  },
  mounted() {
    this.getDate(this.dataBlog.updated_at);
    this.getData(this.dataBlog.slug);
  },
};
</script>
<style scoped>
.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
