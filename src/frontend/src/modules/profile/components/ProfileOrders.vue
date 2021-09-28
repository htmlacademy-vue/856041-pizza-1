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
import { mapState } from "vuex";
import ProfileOrderItem from "@/modules/profile/components/ProfileOrderItem.vue";

export default {
  name: "ProfileOrders",

  components: {
    ProfileOrderItem,
  },

  computed: {
    ...mapState("Orders", ["orders"]),
  },
};
</script>
