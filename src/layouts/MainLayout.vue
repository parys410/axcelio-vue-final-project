<template>
  <div class="mainWeb">
    <web-header :web-title="webTitle" />
    <router-view></router-view>
    <web-footer />
  </div>
</template>

<script>
import WebHeader from "../components/WebHeader.vue";
import WebFooter from "../components/WebFooter.vue";
export default {
  name: "mainWeb",
  data() {
    return {
      webTitle: "Axcelio",
    };
  },
  components: { WebHeader, WebFooter },
};
</script>
<style scoped></style>
