<template>
  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ index }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="$emit('editAddress')">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        {{ address.street }} ул., &nbsp;д. {{ address.building }}, &nbsp;кв.
        {{ address.flat }}
      </p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileAddressViewItem",

  props: {
    index: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>
