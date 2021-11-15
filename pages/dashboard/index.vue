<template>
  <div class="projects-container">
    <div class="projects">
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
    </div>
    <div class="project-display">
      <div class="task-list"></div>
      <div class="project-info"></div>
      <div class="project-users-list"></div>
    </div>
    <div>
      <v-btn @click="logOut">Log Out</v-btn>
      <v-btn @click="createProject">Create a project</v-btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'dashboard',
  auth: true,
  beforeCreate() {
    // Get User object
    const user = this.$auth.$state.user
    const newUser = Object.assign({}, user)

    // Getting user data in firebase to check if basedata
    this.$store.dispatch('getUserDataFromDB', newUser)
  },
  methods: {
    logOut() {
      this.$auth.logout()
    },

    createProject() {
      const user = this.$auth.$state.user
      this.$store.dispatch('createNewProject', user)
    },
  },
}
</script>

<style lang="scss" scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  .projects {
    margin: 15px 0;
    height: 35%;
    &__cards {
      display: flex;
      justify-content: space-around;
      height: 100%;
      &__card {
        height: 80%;
        width: 25%;
        padding: 2.5% 0 2.5% 3%;
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
  }
}
</style>
