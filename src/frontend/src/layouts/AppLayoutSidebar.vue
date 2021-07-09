<template>
  <!-- TODO: Сделать ссылки через router-link и динамически показывать активные -->
  <div class="layout__sidebar sidebar">
    <a href="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </a>

    <a class="layout__link layout__link--active" href="#">История заказов</a>
    <a class="layout__link" href="#">Мои данные</a>
  </div>
</template>

<script>
export default {
  name: "AppLayoutSidebar",
};
</script>
