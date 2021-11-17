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
      <div class="project-display">
        <div class="task-list">
          <h1 class="task-list__title">Task List</h1>
          <div class="task-list__item">
            <div class="task-list__item__date">
              <span>04</span>
              <span>10</span>
            </div>
            <div class="task-list__item__info">
              <div class="task-list__item__info__description">
                <h4>Task to complete</h4>
                <span>description</span>
              </div>
              <div class="task-list__item__status">
                <v-icon>mdi-check-circle</v-icon>
                <v-icon>mdi-check-circle</v-icon>
                <v-icon>mdi-check-circle</v-icon>
              </div>
            </div>
          </div>
          <v-btn class="task-list__add-new">
            <v-icon>mdi-plus</v-icon>
            <h4>Add new task</h4>
          </v-btn>
        </div>
        <div class="project-info">
          <div class="project-info__title main">
            <span class="prev">Te encuentras en el proyecto, </span>
            <h4>&nbsp;Título</h4>
            <!-- <span class="date">16/06/2016</span> -->
          </div>
          <div class="project-info__title next-goal">
            <span class="prev">La siguiente meta es, </span>
            <h4>&nbsp;Tarea</h4>
            <!-- <span class="date">16/06/2016</span> -->
          </div>
          <v-calendar class="calendar" columns="3"></v-calendar>
        </div>
        <div class="project-users-list">
          <h1 class="project-users-list__title">Users</h1>
          <div class="project-users-list__item">
            <v-avatar class="project-users-list__item__avatar">img</v-avatar>
            <div class="project-users-list__item__name">
              <div class="project-users-list__item__name__username">
                kaima64
              </div>
            </div>
            <v-icon>mdi-pencil</v-icon>
            <v-icon>mdi-close</v-icon>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- <v-btn @click="logOut">Log Out</v-btn>
      <v-btn @click="createProject">Create a project</v-btn> -->
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
    height: 100%;
    &__cards {
      display: flex;
      justify-content: space-around;
      height: 35%;
      &__card {
        height: 150px;
        width: 250px;
        min-width: 200px;
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
    .project-display {
      height: 65%;
      width: 100%;
      display: flex;
      .task-list {
        width: 25%;
        max-width: 290px;
        background-color: var(--ligth-blue-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0% 1%;
        &__title {
          text-align: center;
          font-size: 22px;
          margin-top: 5%;
          margin-bottom: 10%;
        }
        &__item {
          display: flex;
          width: 100%;
          padding-bottom: 5%;
          border-bottom: 2px solid var(--shadow-3-color);
          &__date {
            display: flex;
            flex-direction: column;
            background-color: var(--blue-color);
            color: white;
            padding: 1.5% 3%;
            margin-right: 3%;
            font-size: 0.9rem;
          }
          &__info {
            display: flex;
            justify-content: space-between;
            width: 80%;
            &__description {
              display: flex;
              flex-direction: column;
            }
          }
        }
        &__add-new {
          margin: 5%;
          width: 100%;
          color: white;
          background-color: var(--blue-color);
          display: flex;
          justify-content: flex-start;
          h4 {
            width: 100%;
            text-align: center;
            text-transform: capitalize;
          }
        }
      }
      .project-info {
        width: 60%;
        max-width: 800px;
        padding: 10px;
        font-size: 22px;
        &__title {
          display: flex;
          margin-top: 15px;
          .prev {
            font-weight: 200;
          }
          h4 {
            font-weight: 300;
          }
          .date {
            font-weight: 300;
          }
        }
        .calendar {
          transform: scale(0.9);
        }
      }
      .project-users-list {
        width: 20%;
        max-width: 230px;
        background-color: var(--ligth-blue-color);
        padding: 0% 1%;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__title {
          text-align: center;
          font-size: 22px;
          margin-top: 5%;
          margin-bottom: 10%;
        }
        &__item {
          display: flex;
          width: 100%;
          padding-bottom: 5%;
          border-bottom: 2px solid var(--shadow-3-color);
          &__avatar {
            background-color: var(--blue-color);
            color: white;
            margin-right: 15px;
          }
          &__name {
            margin-right: 15px;
            &__username {
              margin-top: 15px;
              color: var(--blue-color);
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
