<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ getTotalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <a v-if="isUserLoggedIn" href="#">
        <picture>
          <source type="image/webp" :srcset="getWebpSource" />
          <img
            :src="user.avatar"
            :srcset="getDoubleImg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </a>

      <a @click.prevent="handleLogin" href="#" class="header__login">
        <span>{{ isUserLoggedIn ? "Выйти" : "Войти" }}</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutHeader",

  computed: {
    ...mapGetters("Cart", ["getTotalPrice"]),

    ...mapState("Auth", ["user"]),

    isUserLoggedIn() {
      return !!this.user?.id;
    },

    getWebpSource() {
      const { avatar } = this.user;
      if (!avatar) return "";

      const normalWebp = avatar.replace(".jpg", ".webp");
      const doubleWebp = avatar.replace(".jpg", "@2x.webp");
      return `${normalWebp} 1x, ${doubleWebp} 2x`;
    },

    getDoubleImg() {
      const { avatar } = this.user;
      if (!avatar) return "";

      return avatar.replace(".jpg", "@2x.jpg");
    },
  },

  methods: {
    ...mapActions("Auth", ["logout"]),

    async handleLogin() {
      if (this.isUserLoggedIn) {
        await this.logout();
        if (this.$route.fullPath !== "/") {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
