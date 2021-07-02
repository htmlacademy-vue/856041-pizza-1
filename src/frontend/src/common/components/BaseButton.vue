<template>
  <button
    v-on="$listeners"
    :disabled="disabled"
    :type="type"
    :class="getClasses"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
      validator: (v) => v === "button" || v === "reset" || v === "submit",
    },
  },

  computed: {
    getClasses() {
      return [
        "button",
        {
          "button--disabled": this.disabled,
        },
      ];
    },
  },
};
</script>
