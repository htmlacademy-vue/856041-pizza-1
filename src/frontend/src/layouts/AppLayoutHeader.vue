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
      <router-link v-if="isUserLoggedIn" to="/profile">
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
      </router-link>

      <a @click.prevent="handleLogin" href="#" class="header__login">
        <span>{{ isUserLoggedIn ? "Выйти" : "Войти" }}</span>
      </a>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  getDoubleImage,
  getDoubleWebpImage,
  getWebpImage,
} from "@/common/helpers";

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

      const normalWebp = getWebpImage(avatar);
      const doubleWebp = getDoubleWebpImage(avatar);
      return `${normalWebp} 1x, ${doubleWebp} 2x`;
    },

    getDoubleImg() {
      const { avatar } = this.user;
      if (!avatar) return "";

      return getDoubleImage(avatar);
    },
  },

  methods: {
    ...mapActions("Auth", ["logout"]),

    async handleLogin() {
      if (this.isUserLoggedIn) {
        await this.logout();
        if (this.$route.fullPath !== "/") {
          await this.$router.push("/");
        }
      } else {
        await this.$router.push("/login");
      }
    },
  },
};
</script>
