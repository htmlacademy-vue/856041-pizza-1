<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      :class="value <= 0 && 'counter__button--disabled'"
      :disabled="value <= 0"
      @click="$emit('change', value - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      readonly
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="value >= maxCount && 'counter__button--disabled'"
      :disabled="value >= maxCount"
      @click="$emit('change', value + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseItemCounter",

  model: {
    prop: "value",
    event: "change",
  },

  props: {
    value: {
      type: Number,
      required: true,
    },

    maxCount: {
      type: Number,
      default: 3,
    },
  },
};
</script>
