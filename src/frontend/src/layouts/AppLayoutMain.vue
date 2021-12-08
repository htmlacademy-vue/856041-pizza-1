<template>
  <div class="root">
    <app-layout-header />
    <main class="layout">
      <app-layout-sidebar />
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader.vue";
import AppLayoutSidebar from "./AppLayoutSidebar.vue";

export default {
  name: "AppLayoutMain",

  components: { AppLayoutHeader, AppLayoutSidebar },
};
</script>
