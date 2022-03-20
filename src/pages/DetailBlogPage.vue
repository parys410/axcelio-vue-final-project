<template>
  <div class="flex flex-col px-24 py-8 items-center">
    <div class="flex flex-col sm:w-full md:w-5/6 lg:w-4/6 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-yellow-500">
          {{ judul }}
        </h1>
      </div>
      <div class="penulis mt-2 flex items-center gap-4">
        <div
          class="rounded-full h-12 w-12"
          :style="{
            background: `url('${user.avatar}') no-repeat`,
            backgroundSize: 'cover',
          }"
        ></div>
        <div class="flex flex-col">
          <div class="text-sm font-semibold">
            {{ user.nama }}
          </div>
          <div class="text font-semibold text-gray-500">
            {{ user.bio }}
          </div>
          <div class="text-xs">{{ dateBlog }}</div>
        </div>
      </div>
      <img :src="img" alt="thumbnail" class="w-full rounded-xl" />
      <div class="content" v-html="content"></div>
    </div>
    <div class="pt-8">
      <div class="grid grid-cols-3 gap-4">
        <blog-card
          v-for="blog in related"
          :key="blog.blog_id"
          :data-blog="blog"
        ></blog-card>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { useToast } from "vue-toastification";
import axios from "axios";
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "DetailBlog",
  components: { BlogCard },
  data() {
    return {
      dataDetailBlog: [],
      prevSlug: "",
      dateBlog: "",
      judul: "",
      img: "",
      content: "",
      user: {
        nama: "",
        bio: "",
        avatar: "",
      },
      related: [],
    };
  },
  methods: {
    async getData(slug) {
      const toast = useToast();
      try {
        const fetchData = await axios.get(
          "https://axcelio.id/api/blog/" + slug
        );
        if (fetchData && fetchData.data.status == "success") {
          this.dataDetailBlog = fetchData?.data?.data;
          this.getDate(this.dataDetailBlog.updated_at);
          this.judul = this.dataDetailBlog.judul;
          this.user.avatar = this.dataDetailBlog.user.avatar;
          this.user.bio = this.dataDetailBlog.user.bio;
          this.user.nama = this.dataDetailBlog.user.nama_lengkap;
          this.img = this.dataDetailBlog.thumbnail;
          this.content = this.dataDetailBlog.isi;
          this.related = this.dataDetailBlog.related;
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
    getDate(dateString) {
      dayjs.extend(localizeFormat);
      this.dateBlog = dayjs(dateString).format("MMM, DD YYYY HH:mm A");
    },
    goToBlog() {
      this.$router.push({
        name: "Blog",
      });
    },
  },
  mounted() {
    this.getData(this.$route.params.slug);
  },
  watch: {
    // $route(to, from) {
    //   if (to.name == "DetailBlog") {
    //     this.getData(to.params.slug);
    //   }
    // },
  },
};
</script>
<style scoped>
.content ::v-deep(hr) {
  margin-top: 10px;
  margin-bottom: 10px;
}
.content ::v-deep(p) {
  font-size: 12pt;
  margin-top: 8px;
  margin-bottom: 16px;
  line-height: 32pt;
}
.content ::v-deep(h1) {
  font-size: 16pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.content ::v-deep(h2) {
  font-size: 14pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.content ::v-deep(h3) {
  font-size: 12pt;
  font-weight: bold;
  padding-top: 16px;
  padding-bottom: 12px;
}
.content ::v-deep(ol) {
  font-size: 12pt;
  margin-bottom: 16px;
}
.content ::v-deep(li) {
  font-size: 12pt;
  list-style-type: decimal;
  margin-left: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
}
.content ::v-deep(img) {
  display: block;
  margin: auto;
}
.content ::v-deep(a) {
  color: blue;
}
.content ::v-deep(blockquote) {
  display: block;
  padding-top: 8px;
  padding-bottom: 2px;
  padding-left: 20px;
  padding-right: 20px;
  background: lightgrey;
  border-left: 4px solid lightskyblue;
}
</style>
