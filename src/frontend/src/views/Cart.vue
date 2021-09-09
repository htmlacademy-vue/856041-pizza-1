<template>
  <form
    action="#"
    method="post"
    class="layout-form"
    @submit.prevent="submitOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <cart-empty v-if="isCartEmpty" />

        <template v-else>
          <cart-list />

          <cart-additional />

          <cart-form />
        </template>
      </div>
    </main>

    <base-modal v-if="showSuccessModal">
      <cart-success />
    </base-modal>

    <cart-footer v-if="!isCartEmpty"></cart-footer>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_CART, RESET_DELIVERY } from "@/store/mutations-types";

import CartEmpty from "@/modules/cart/components/CartEmpty.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditional from "@/modules/cart/components/CartAdditional.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import BaseModal from "@/common/components/BaseModal.vue";
import CartSuccess from "@/modules/cart/components/CartSuccess.vue";

export default {
  name: "CartIndex",

  components: {
    BaseModal,
    CartEmpty,
    CartFooter,
    CartList,
    CartAdditional,
    CartForm,
    CartSuccess,
  },

  data() {
    return {
      showSuccessModal: false,
    };
  },

  computed: {
    ...mapGetters("Cart", ["isCartEmpty"]),
  },

  mounted() {
    this.query();
  },

  methods: {
    ...mapMutations("Cart", {
      resetCart: RESET_CART,
      resetDelivery: RESET_DELIVERY,
    }),

    ...mapActions("Cart", ["createOrder"]),

    ...mapActions("Cart", ["query"]),

    async submitOrder() {
      try {
        await this.createOrder();
        this.showSuccessModal = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
