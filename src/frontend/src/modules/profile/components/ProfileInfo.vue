<template>
  <div class="user">
    <picture>
      <source type="image/webp" :srcset="getWebpSourceSet" />
      <img
        :src="getImgSource"
        :srcset="getImgSourceSet"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getDoubleImage,
  getDoubleWebpImage,
  getQuadrupleImage,
  getQuadrupleWebp,
} from "@/common/helpers";

export default {
  name: "ProfileInfo",

  computed: {
    ...mapState("Auth", ["user"]),

    getWebpSourceSet() {
      const { avatar } = this.user;
      if (!avatar) return "";

      return `${getDoubleWebpImage(avatar)} 1x, ${getQuadrupleWebp(avatar)} 2x`;
    },

    getImgSource() {
      const { avatar } = this.user;
      if (!avatar) return "";

      return getDoubleImage(avatar);
    },

    getImgSourceSet() {
      const { avatar } = this.user;
      if (!avatar) return "";

      return getQuadrupleImage(avatar);
    },
  },
};
</script>
