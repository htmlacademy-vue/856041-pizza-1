<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <profile-info />

    <profile-addresses />
  </div>
</template>

<script>
import ProfileInfo from "@/modules/profile/components/ProfileInfo.vue";
import ProfileAddresses from "@/modules/profile/components/ProfileAddresses.vue";
import { mapActions } from "vuex";

export default {
  name: "ProfileIndex",

  components: {
    ProfileAddresses,
    ProfileInfo,
  },

  async mounted() {
    await this.loadAddresses();
  },

  methods: {
    ...mapActions("Auth", ["loadAddresses"]),
  },
};
</script>
