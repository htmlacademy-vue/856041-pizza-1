<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1 564 ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <profile-order-item-pizza
        v-for="pizza in order.orderPizzas"
        :pizza="pizza"
        :key="pizza.id"
      />
    </ul>

    <ul class="order__additional">
      <profile-order-item-misc
        v-for="misc in order.orderMisc"
        :misc="misc"
        :key="misc.id"
      />
    </ul>

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<script>
import ProfileOrderItemPizza from "@/modules/profile/components/ProfileOrderItemPizza.vue";
import ProfileOrderItemMisc from "@/modules/profile/components/ProfileOrderItemMisc.vue";

export default {
  name: "ProfileOrderItem",

  components: {
    ProfileOrderItemPizza,
    ProfileOrderItemMisc,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>
