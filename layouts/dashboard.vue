<template>
  <div>
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
    <div class="content">
      <div class="projects__cards">
        <div class="projects__cards__new-card projects__cards__card">
          <div class="projects__cards__new-card__title">
            Create a new project
          </div>
          <div class="projects__cards__new-card__plus">
            <v-icon>mdi-plus</v-icon>
          </div>
        </div>
        <div v-for="i in 2" :key="i" class="projects__cards__card">
          <span class="projects__cards__card__title">Millionaie Project</span>
          <span class="projects__cards__card__description">
            Small description
          </span>
          <span class="projects__cards__card__date">
            Finish date: 06/15/2021
          </span>
        </div>
      </div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top-menu {
  height: 10%;
  width: 100%;
  padding: 2% 50px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 99;
  &__title {
    font-size: 22px;
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

.projects__cards {
  display: flex;
  align-items: center;
  height: 250px;
  border-bottom: 3px solid #ededed;
  &__card {
    height: 175px;
    width: 300px;
    min-width: 250px;
    padding: 25px 35px;
    margin-right: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
    border: 2px solid var(--ligth-blue-color);
    border-bottom: 8px solid var(--red-color);
    > span {
      margin: 7px 0;
    }
    &__title {
      font-size: 16px;
      color: var(--blue-color);
    }
    &__description,
    &__date {
      font-size: 14px;
      color: var(--gray-color);
    }
  }
  &__new-card {
    border: 1px solid var(--ligth-blue-color);
    color: var(--blue-color);
    text-align: center;
    &__title {
      font-size: 16px;
    }
    &__plus {
      i {
        color: var(--blue-color);
        font-size: 80px;
      }
    }
  }
}
.content {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  top: 40px;
  padding: 30px 20px;
}
</style>
