<template>
  <label class="input">
    <slot></slot>
    <input
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BaseInput",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
