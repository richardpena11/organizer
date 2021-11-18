<template>
  <div class="projects-container">
    <div class="projects">
      <div class="project-display">
        <div class="task-list">
          <h4 class="task-list__title">Task List</h4>
          <div v-for="(task, index) in 5" :key="index" class="task-list__item">
            <div class="task-list__item__date">
              <span>04</span>
              <span>10</span>
            </div>
            <div class="task-list__item__info">
              <div class="task-list__item__info__description">
                <h4>Task to complete</h4>
                <span>description</span>
              </div>
              <div class="task-list__item__info__status">
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
          <div class="project-info__desc">
            <div class="project-info__desc__title">
              <span class="prev"
                >Te encuentras en el proyecto,
                <h4>Título</h4></span
              >
              <span class="date">16/06/2016</span>
            </div>
            <div class="project-info__desc__title">
              <span class="prev"
                >La siguiente meta es,
                <h4>Tarea</h4></span
              >
              <span class="date">16/06/2016</span>
            </div>
          </div>
          <v-calendar class="project-info__calendar" :columns="3"></v-calendar>
        </div>
        <div class="project-users-list">
          <h4 class="project-users-list__title">Users</h4>
          <div
            v-for="(task, index) in 6"
            :key="index"
            class="project-users-list__item"
          >
            <v-avatar size="40" class="project-users-list__item__avatar"
              >img</v-avatar
            >
            <div class="project-users-list__item__name">kaima64</div>
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
  updated() {
    this.$store.dispatch('getProjectData', this.$route.params.project)
  },

  methods: {
    logOut() {
      this.$auth.logout()
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
    .project-display {
      max-width: 1500px;
      width: 100%;
      margin: 0 auto;
      margin-top: 35px;
      display: flex;
      justify-content: space-between;
      .task-list {
        width: 25%;
        max-width: 350px;
        padding: 20px 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--ligth-blue-color);
        &__title {
          margin-bottom: 15px;
          font-size: 20px;
          text-align: center;
        }
        &__item {
          width: 100%;
          display: flex;
          padding: 5px 0;
          border-bottom: 2px solid var(--shadow-3-color);
          &__date {
            display: flex;
            flex-direction: column;
            background-color: var(--blue-color);
            color: white;
            padding: 5px 10px;
            font-size: 16px;
          }
          &__info {
            width: 100%;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            &__description {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            }
          }
        }
        &__add-new {
          width: 100%;
          margin: 15px;
          color: white;
          background-color: var(--blue-color);
          h4 {
            width: 100%;
            text-align: center;
            text-transform: capitalize;
          }
        }
      }
      .project-info {
        width: 58%;
        max-width: 800px;
        padding: 0 10px;
        font-size: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &__desc {
          &__title {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            font-family: 'Roboto Condensed', sans-serif;
            .prev {
              font-family: inherit;
              font-weight: 300;
              color: var(--gray-color);
              h4 {
                color: #000;
                font-family: inherit;
                display: inline-block;
                font-weight: 400;
              }
            }
            .date {
              font-family: inherit;
              font-weight: 300;
            }
          }
        }
      }
      .project-users-list {
        width: 17%;
        max-width: 225px;
        background-color: var(--ligth-blue-color);
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__title {
          text-align: center;
          font-size: 20px;
          margin-bottom: 10px;
        }
        &__item {
          width: 100%;
          padding: 10px 0;
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--shadow-3-color);
          &__avatar {
            margin-right: 10px;
            background-color: var(--blue-color);
            color: white;
          }
          &__name {
            width: 100%;
            font-weight: bold;
            color: var(--blue-color);
          }
        }
      }
    }
  }
}
</style>
