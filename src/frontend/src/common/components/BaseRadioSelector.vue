<template>
  <label :class="getInputClasses">
    <input
      class="visually-hidden"
      type="radio"
      :value="value"
      :checked="isRadioChecked"
      @change="$emit('change', $event.target.value)"
    />
    <div class="radio-input__content">
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: "BaseRadioSelector",

  model: {
    prop: "modelValue",
    event: "change",
  },

  props: {
    modelValue: {
      required: true,
      validator: (v) =>
        ["undefined", "string", "number", "boolean"].includes(typeof v),
    },
    value: {
      required: true,
      validator: (v) =>
        ["undefined", "string", "number", "boolean"].includes(typeof v),
    },
  },

  computed: {
    isRadioChecked() {
      return this.value === this.modelValue;
    },

    getInputClasses() {
      return ["radio-input", { "radio-input--checked": this.isRadioChecked }];
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;

  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 19px;

  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    & img,
    & .image-wrapper {
      box-shadow: $shadow-regular;
    }
  }

  &--checked {
    & img,
    & .image-wrapper {
      box-shadow: $shadow-large !important;
    }
  }

  & img {
    border-radius: 50%;
    transition: 0.3s;
    margin-right: 10px;
  }

  &__content {
    position: relative;
    height: 36px;

    display: flex;
    align-items: center;
  }
}
</style>
