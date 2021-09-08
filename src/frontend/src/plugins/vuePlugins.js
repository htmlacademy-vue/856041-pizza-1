import Vue from "vue";
import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers";
import VueMask from "v-mask";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $api() {
          return createResources();
        },
      },
    });
  },
};

Vue.use(plugins);
Vue.use(VueMask);
