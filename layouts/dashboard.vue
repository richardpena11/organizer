<template>
  <div>
    <div class="top-menu">
      <h1 class="top-menu__title">Tus Proyectos</h1>
      <img src="../assets/images/san_diego_logo.webp" alt="" />
      <div class="top-menu__profile">
        <v-avatar class="top-menu__profile__avatar">
          <img :src="user.picture" alt="John" />
        </v-avatar>
        <div class="top-menu__profile__name">
          <div class="top-menu__profile__name__label">Usuario</div>
          <div class="top-menu__profile__name__username">
            {{ user.nickname }}
          </div>
        </div>
        <div class="top-menu__profile__dropdown">
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="projects__cards">
        <NuxtLink
          class="projects__cards__new-card projects__cards__card"
          to="/dashboard"
        >
          <div class="projects__cards__new-card__title">
            Crear nuevo proyecto
          </div>
          <div class="projects__cards__new-card__plus">
            <v-icon>mdi-plus</v-icon>
          </div>
        </NuxtLink>
        <NuxtLink
          v-for="(project, i) in projects"
          :key="i"
          :to="`/dashboard/project/${project.ID}`"
          class="projects__cards__card"
        >
          <span class="projects__cards__card__title">{{ project.title }}</span>
          <span class="projects__cards__card__description">
            {{ project.description }}
          </span>
          <span class="projects__cards__card__date">
            Fecha de finalización: {{ project.finishDate }}
          </span>
        </NuxtLink>
      </div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.state.user
    },

    projects() {
      return this.$store.state.userProjectsList
    },
  },
  beforeCreate() {
    // Get User object
    const user = this.$auth.$state.user
    const newUser = Object.assign({}, user)

    // const projectid = this.$route.params.project

    // Getting user data in firebase to check if basedata
    this.$store.dispatch('getUserDataFromDB', newUser)
  },
}
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
  img {
    width: 120px;
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
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    border: 2px solid var(--ligth-blue-color);
    border-bottom: 8px solid var(--red-color);
    transition: 0.2s background-color;
    &:hover {
      background: var(--ligth-blue-color);
    }
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
