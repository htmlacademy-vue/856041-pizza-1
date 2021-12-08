<template>
  <div class="addresses">
    <profile-address-view-item
      v-for="(address, index) in addresses"
      :key="address.id"
      :address="address"
      :index="index + 1"
      @editAddress="editAddress(address)"
    />

    <profile-address-edit-item
      v-if="showEditForm"
      :counter="getAddressIndex"
      :address="selectedAddress"
      @done="saveAddress"
      @delete="deleteSelectedAddress"
    />

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="addNewAddress"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import ProfileAddressEditItem from "./ProfileAddressEditItem.vue";
import ProfileAddressViewItem from "./ProfileAddressViewItem.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ProfileAddresses",

  components: {
    ProfileAddressEditItem,
    ProfileAddressViewItem,
  },

  computed: {
    ...mapState("Auth", ["addresses"]),

    getAddressIndex() {
      if (this.selectedAddress) {
        const { id } = this.selectedAddress;
        const index = this.addresses.findIndex((el) => el.id === id);
        return index + 1;
      } else {
        return this.addresses.length + 1;
      }
    },
  },

  data() {
    return {
      selectedAddress: undefined,
      showEditForm: false,
    };
  },

  methods: {
    ...mapActions("Auth", ["addAddress", "updateAddress", "deleteAddress"]),

    async saveAddress(address) {
      if (this.selectedAddress) {
        await this.updateAddress({ ...address, id: this.selectedAddress.id });
      } else {
        await this.addAddress(address);
      }
      this.showEditForm = false;
      this.selectedAddress = undefined;
    },

    addNewAddress() {
      this.selectedAddress = undefined;
      this.showEditForm = true;
    },

    editAddress(address) {
      this.$set(this, "selectedAddress", address);
      this.showEditForm = true;
    },

    async deleteSelectedAddress() {
      const { id } = this.selectedAddress;
      await this.deleteAddress(id);
      this.showEditForm = false;
      this.selectedAddress = undefined;
    },
  },
};
</script>
