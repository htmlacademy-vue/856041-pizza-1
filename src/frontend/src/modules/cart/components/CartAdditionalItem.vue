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
import { mapMutations } from "vuex";
import { UPDATE_ENTITY } from "@/store/mutations-types";

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
    counter: {
      get() {
        return this.item.quantity;
      },
      set(val) {
        this.updateEntity({
          module: "Cart",
          entity: "additional",
          value: {
            ...this.item,
            quantity: val,
          },
        });
      },
    },
  },

  methods: {
    ...mapMutations({
      updateEntity: UPDATE_ENTITY,
    }),
  },
};
</script>
