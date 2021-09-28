<template>
  <li>
    <img
      :src="formattedMisc.image"
      width="20"
      height="30"
      :alt="formattedMisc.name"
    />
    <p>
      <span>{{ formattedMisc.name }}</span>
      <b>{{ formattedPrice }}</b>
    </p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileOrderItemMisc",

  props: {
    misc: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["getMiscByID"]),

    formattedMisc() {
      return this.getMiscByID(this.misc.miscId);
    },

    formattedPrice() {
      const { misc, formattedMisc } = this;
      if (misc.quantity > 1) {
        return `${misc.quantity} x ${formattedMisc.price} ₽`;
      } else {
        return `${formattedMisc.price} ₽`;
      }
    },
  },
};
</script>
