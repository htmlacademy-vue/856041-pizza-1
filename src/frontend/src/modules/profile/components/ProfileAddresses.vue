<template>
  <div class="addresses">
    <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №1. Тест</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>Невский пр., д. 22, оф. 46</p>
        <small>Позвоните, пожалуйста, от проходной</small>
      </div>
    </div>
    <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №1. Тест</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>Невский пр., д. 22, оф. 46</p>
        <small>Позвоните, пожалуйста, от проходной</small>
      </div>
    </div>
    <profile-address-edit-item @done="saveAddress" />

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileAddressEditItem from "./ProfileAddressEditItem.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileAddresses",

  components: {
    ProfileAddressEditItem,
  },

  computed: {
    ...mapState("Auth", ["addresses"]),
  },

  data() {
    return {
      selectedAddress: null,
    };
  },

  methods: {
    ...mapActions("Auth", ["addAddress"]),
    async saveAddress(address) {
      await this.addAddress(address);
    },
  },
};
</script>
