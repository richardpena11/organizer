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
    <Nuxt class="content" />
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top-menu {
  height: 80px;
  width: calc(100% - 80px);
  padding: 0px 50px;
  position: fixed;
  top: 0;
  left: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 28px;
  }
  &__profile {
    width: 175px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &__name {
      color: var(--dark-blue-color);
      &__label {
        color: var(--gray-color);
        font-size: 14px;
        font-weight: 700;
        font-family: 'Roboto Condensed', sans-serif;
      }
      &__username {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}

.left-menu {
  height: 100vh;
  width: 80px;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--white-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 2px solid var(--shadow-3-color);
  > div {
    display: flex;
    justify-content: center;
  }
  i {
    color: var(--dark-blue-color);
    font-size: 35px;
    padding: 20px;
    &:hover {
      cursor: pointer;
      background: var(--shadow-2-color);
    }
  }
  &__upper {
    border-bottom: 2px solid var(--shadow-3-color);
  }
  &__center {
    flex-direction: column;
    justify-content: center;
  }
  &__lower {
    border-top: 2px solid var(--shadow-3-color);
  }
}

.content {
  width: calc(100vw - 80px);
  height: calc(100vh - 80px);
  position: relative;
  top: 80px;
  left: 80px;
  padding: 30px;
}
</style>
