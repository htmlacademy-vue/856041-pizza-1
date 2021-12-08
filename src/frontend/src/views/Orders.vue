<template>
  <profile-orders />
</template>

<script>
import { mapActions } from "vuex";
import ProfileOrders from "@/modules/profile/components/ProfileOrders.vue";

export default {
  name: "OrdersIndex",

  components: {
    ProfileOrders,
  },

  async mounted() {
    await this.query();
    await this.loadOrders();
  },

  methods: {
    ...mapActions("Orders", ["loadOrders"]),
    ...mapActions("Cart", ["query"]),
  },
};
</script>
