<template>
  <div class="px-24 pb-12 flex flex-col">
    <div class="mt-16 flex flex-col" ref="kelas">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold mt-8 text-center text-blue-400">
          Blog Post
        </h1>
      </div>
      <div class="pt-8">
        <div class="grid grid-cols-3 gap-4">
          <blog-card
            v-for="blog in dataBlog"
            :key="blog.blog_id"
            :data-blog="blog"
          ></blog-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogCard from "../components/BlogCard.vue";
import { useToast } from "vue-toastification";
import axios from "axios";
export default {
  name: "BlogPage",
  components: { BlogCard },
  data() {
    return {
      dataBlog: [],
    };
  },
  methods: {
    async getData() {
      const toast = useToast();
      try {
        const fetchData = await axios.get("https://axcelio.id/api/blog");
        if (fetchData && fetchData.data.status == "success") {
          this.dataBlog = fetchData?.data?.data?.data;
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
    this.getData();
  },
};
</script>
