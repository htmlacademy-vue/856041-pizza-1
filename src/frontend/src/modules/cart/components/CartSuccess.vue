<template>
  <div class="popup">
    <router-link :to="redirectLink" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="redirectLink" class="button"
        >Отлично, я жду!</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CartSuccess",

  computed: {
    ...mapState("Auth", ["user"]),

    redirectLink() {
      const { id } = this.user;
      return id ? "/orders" : "/";
    },
  },
};
</script>
