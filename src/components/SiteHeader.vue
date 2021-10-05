<template>
  <header class="header">
    <img src="@/assets/images/logo.svg" alt="NF Logo" class="header__logo" width="78" height="48"/>
    <nav class="nav">
      <router-link :to="{ name: 'Portfolio'}" class="nav__link">Portfolio</router-link>
      <!--      <a href="https://www.google.com/" target="_blank" rel="noopener" class="nav__link">Resume</a>-->
      <a href="https://github.com/nfrostdev" target="_blank" rel="noopener" class="nav__link">Github</a>
      <a href="mailto:nfrost.dev@gmail.com" target="_blank" rel="noopener" class="nav__link">Contact</a>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  @apply grid place-items-center text-nf-blue pt-16;

  &__logo {
    @apply h-12 mb-6;
  }
}

.nav {
  @apply fixed bottom-0 right-0 left-0 mx-8 mb-8 grid grid-cols-3 font-semibold rounded overflow-hidden shadow text-sm z-10;
  @apply sm:text-base sm:relative sm:bottom-auto sm:mb-0;

  &__link {
    @apply grid place-items-center text-gray-700 px-3 py-2 bg-white transition duration-200;
    @apply sm:px-4 sm:py-3;

    &:hover, &:focus, &.router-link-exact-active {
      @apply bg-nf-blue text-white;
    }
  }
}
</style>
