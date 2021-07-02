<template>
  <label class="input">
    <slot></slot>
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      :required="required"
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
    name: {
      type: String,
      required: true,
      validator: (v) => v.length,
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
