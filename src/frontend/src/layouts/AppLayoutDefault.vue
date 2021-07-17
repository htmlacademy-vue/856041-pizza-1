<template>
  <div class="root">
    <app-layout-header />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
  },
};
</script>
