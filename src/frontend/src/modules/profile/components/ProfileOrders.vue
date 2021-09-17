<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <profile-order-item
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>

<script>
import ProfileOrderItem from "@/modules/profile/components/ProfileOrderItem.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProfileOrders",

  components: {
    ProfileOrderItem,
  },

  mounted() {
    this.loadOrders();
  },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  methods: {
    ...mapActions("Orders", ["loadOrders"]),
  },
};
</script>
