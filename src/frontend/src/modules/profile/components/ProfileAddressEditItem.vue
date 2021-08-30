<template>
  <div class="layout__address">
    <form
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="saveAddress"
    >
      <div class="address-form__header">
        <b>Адрес №1</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
              v-model="name"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
              v-model="street"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
              v-model="building"
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
              v-model="flat"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
              v-model="comment"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="isEditing"
          type="button"
          class="button button--transparent"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressEditItem",

  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
  },

  methods: {
    saveAddress() {
      const { name, street, building, flat, comment } = this;
      const address = { name, street, building, flat, comment };
      this.$emit("done", address);
    },
  },
};
</script>
