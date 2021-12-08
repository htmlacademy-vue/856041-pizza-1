<template>
  <base-modal>
    <div class="sign-form">
      <router-link to="/" class="close close--white">
        <span class="visually-hidden">Закрыть форму авторизации</span>
      </router-link>
      <div class="sign-form__title">
        <h1 class="title title--small">Авторизуйтесь на сайте</h1>
      </div>
      <form action="#" method="post" @submit.prevent="handleSubmit">
        <div class="sign-form__input">
          <base-input
            required
            type="email"
            placeholder="example@mail.ru"
            v-model="email"
          >
            <span>E-mail</span>
          </base-input>
        </div>

        <div class="sign-form__input">
          <base-input
            required
            type="password"
            placeholder="***********"
            v-model="password"
          >
            <span>Пароль</span>
          </base-input>
        </div>
        <span v-if="error" class="error">{{ error }}</span>
        <button :disabled="isLoading" type="submit" class="button">
          Авторизоваться
        </button>
      </form>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "@/common/components/BaseModal.vue";
import BaseInput from "@/common/components/BaseInput.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "LoginIndex",

  components: {
    BaseInput,
    BaseModal,
  },

  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },

  computed: {
    ...mapState("Auth", ["error"]),
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async handleSubmit() {
      const { email, password } = this;
      this.isLoading = true;
      try {
        await this.login({ email, password });
        this.$router.push("/");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
