<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <base-item-counter class="additional-list__counter" v-model="counter" />

      <div class="additional-list__price">
        <b
          >{{ misc && misc.quantity > 0 ? `${misc.quantity}x ` : "" }}
          {{ item.price }} ₽</b
        >
      </div>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_MISC } from "@/store/mutations-types";

export default {
  name: "CartAdditionalItem",

  components: {
    BaseItemCounter,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Cart", ["getCartMiscById"]),

    counter: {
      get() {
        const { misc } = this;
        return misc?.quantity ?? 0;
      },
      set(val) {
        this.updateMisc({
          miscId: this.item.id,
          quantity: val,
        });
      },
    },

    misc() {
      return this.getCartMiscById(this.item.id);
    },
  },

  methods: {
    ...mapMutations("Cart", {
      updateMisc: UPDATE_MISC,
    }),
  },
};
</script>
