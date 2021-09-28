<template>
  <header class="header">
    <img src="@/assets/images/logo.svg" alt="NF Logo" class="header__logo"/>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid place-items-center text-nf-blue;

  &__logo {
    @apply h-12;
  }
}
</style>
