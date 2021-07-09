<template>
  <label class="input">
    <slot></slot>
    <input
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
import { INPUT_TYPES } from "@/common/constants.js";

export default {
  name: "BaseInput",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    type: {
      type: String,
      default: "text",
      validator: (v) => INPUT_TYPES.includes(v),
    },

    placeholder: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      required: true,
    },
  },
};
</script>
