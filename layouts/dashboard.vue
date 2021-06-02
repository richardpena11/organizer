<template>
  <nav>
    <div class="top-menu">
      <h1 class="top-menu__title">Dashboard</h1>
      <div class="top-menu__profile">
        <v-avatar class="top-menu__profile__avatar">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <div class="top-menu__profile__name">
          <div class="top-menu__profile__name__label">User</div>
          <div class="top-menu__profile__name__username">kaima64</div>
        </div>
        <div class="top-menu__profile__dropdown">
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </div>
    </div>
    <div class="left-menu">
      <div class="left-menu__upper">
        <v-icon>mdi-calendar-text</v-icon>
      </div>

      <div class="left-menu__center">
        <v-icon>mdi-home</v-icon>
        <v-icon>mdi-account</v-icon>
        <v-icon>mdi-message</v-icon>
      </div>

      <div class="left-menu__lower">
        <v-icon>mdi-logout-variant</v-icon>
      </div>
    </div>
    <Nuxt />
    <div>this is a loyout hehe</div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.left-menu {
  height: 100vh;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: #9f9f9f;
  &__upper {
    border-bottom: 2px solid #e8ecf6;
  }
}
</style>
