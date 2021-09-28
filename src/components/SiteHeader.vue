<template>
  <header class="header">
    <img src="@/assets/images/logo.svg" alt="NF Logo" class="header__logo"/>
    <nav class="nav">
      <router-link :to="{ name: 'Portfolio'}" class="nav__link">Portfolio</router-link>
      <a href="https://www.google.com/" target="_blank" rel="noopener" class="nav__link">Resume</a>
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
  @apply grid grid-cols-4 font-semibold rounded overflow-hidden shadow text-xs;
  @apply sm:text-base;

  &__link {
    @apply grid place-items-center text-gray-700 px-4 py-3 bg-white transition duration-200;

    &:hover, &:focus, &.router-link-exact-active {
      @apply bg-nf-blue text-white;
    }
  }
}
</style>
