<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  async created() {
    await this.$store.dispatch("init");
    if (this.$jwt.getToken()) {
      await this.$store.dispatch("Auth/setUser");
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
