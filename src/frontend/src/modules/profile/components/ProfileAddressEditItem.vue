<template>
  <div class="layout__address" ref="editForm">
    <form
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="saveAddress"
    >
      <div class="address-form__header">
        <b>Адрес №{{ counter }}</b>
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
          @click="$emit('delete')"
        >
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfileAddressEditItem",

  props: {
    counter: {
      type: Number,
      required: true,
    },

    address: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapState("Auth", ["user"]),

    isEditing() {
      const { address } = this;
      return address && Object.keys(address)?.length > 0;
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
      const { id: userId } = this.user;

      const address = { name, street, building, flat, comment, userId };
      this.$emit("done", address);
    },
  },

  watch: {
    address: {
      immediate: true,
      deep: true,
      async handler(address) {
        if (!address) {
          this.name = "";
          this.street = "";
          this.building = "";
          this.flat = "";
          this.comment = "";
        } else if (Object.keys(address)?.length > 0) {
          for (const [key, value] of Object.entries(address)) {
            this[key] = value;
          }
        }

        await this.$nextTick();
        this.$refs.editForm.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      },
    },
  },
};
</script>
