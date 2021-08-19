<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <profile-info />

    <profile-addresses v-if="addresses" :addresses="addresses" />

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileInfo from "@/modules/profile/components/ProfileInfo.vue";
import ProfileAddresses from "@/modules/profile/components/ProfileAddresses.vue";
import { mapState } from "vuex";

export default {
  name: "ProfileIndex",

  components: {
    ProfileAddresses,
    ProfileInfo,
  },

  computed: {
    ...mapState("Auth", ["addresses"]),
  },
};
</script>
