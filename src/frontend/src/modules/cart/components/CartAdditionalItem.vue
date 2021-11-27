<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <base-item-counter class="additional-list__counter" v-model="counter" />

      <div class="additional-list__price">
        <b>{{ item.price * item.quantity }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import { mapGetters, mapMutations } from "vuex";
import { ADD_MISC, UPDATE_MISC } from "@/store/mutations-types";

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
        const misc = this.getCartMiscById(this.item.id);
        return misc?.quantity ?? 0;
      },
      set(val) {
        const misc = this.getCartMiscById(this.item.id);
        if (misc?.quantity > 0) {
          this.updateMisc({
            ...misc,
            quantity: val,
          });
        } else {
          const { id: miscId } = this.item;
          this.addMisc(miscId);
        }
      },
    },
  },

  methods: {
    ...mapMutations("Cart", {
      updateMisc: UPDATE_MISC,
      addMisc: ADD_MISC,
    }),
  },
};
</script>
