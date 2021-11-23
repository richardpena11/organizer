<template>
  <div class="projects-container" data-app>
    <div class="projects">
      <div class="project-display">
        <div class="task-list">
          <h4 class="task-list__title">Lista de Tareas</h4>
          <div
            v-for="(task, index) in project.tasks"
            :key="index"
            class="task-list__item"
          >
            <div class="task-list__item__date">
              <span>04</span>
              <span>10</span>
            </div>
            <div class="task-list__item__info">
              <div class="task-list__item__info__description">
                <h4>Task to complete</h4>
              </div>
              <v-radio-group class="task-list__item__info__status" row>
                <v-radio color="#388E3C" value="green"></v-radio>
                <v-radio color="#F9A825" value="yellow"></v-radio>
                <v-radio color="#D50000" value="red"></v-radio>
              </v-radio-group>
            </div>
          </div>
          <v-btn class="task-list__add-new" @click="dialog = true">
            <v-icon>mdi-plus</v-icon>
            <h4>Añadir nueva tarea</h4>
          </v-btn>
        </div>
        <div class="project-info">
          <div class="project-info__desc">
            <div class="project-info__desc__title">
              <span class="prev"
                >Te encuentras en el proyecto,
                <h4>{{ project.title }}</h4></span
              >
              <span class="date">{{ project.finishDate }}</span>
            </div>
            <div class="project-info__desc__title">
              <span class="prev"
                >La siguiente meta es,
                <h4>Tarea</h4></span
              >
              <span class="date">16/06/2016</span>
            </div>
          </div>
          <v-calendar class="project-info__calendar" :columns="2"></v-calendar>
        </div>
        <div class="project-users-list">
          <h4 class="project-users-list__title">Usuarios</h4>
          <div
            v-for="(user, index) in project.Users"
            :key="index"
            class="project-users-list__item"
          >
            <v-avatar size="40" class="project-users-list__item__avatar"
              ><img :src="user.picture" alt="John"
            /></v-avatar>
            <div class="project-users-list__item__name">
              {{ user.nickname }}
            </div>
            <!-- <v-icon>mdi-pencil</v-icon>
            <v-icon>mdi-close</v-icon> -->
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" class="task-pop-up" width="500">
      <div class="create-new-task">
        <v-btn
          class="create-new-task__close-dialog"
          icon
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h1>Añadir nueva tarea</h1>
        <div class="create-new-task__form">
          <v-text-field
            label="Título"
            counter="30"
            light
            single-line
            outlined
          ></v-text-field>
          <div class="create-new-task__form__date-picker">
            <span>Seleccione la fecha de finalización</span>
            <v-date-picker />
          </div>
        </div>
        <v-btn class="create-new-task__submit">Añadir nueva tarea</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'dashboard',
  data: () => ({
    dialog: false,
  }),
  auth: true,

  computed: {
    project() {
      console.log(this.$store.state.currentProject)
      if (this.$store.state.currentProject) {
        return this.$store.state.currentProject
      } else {
        return {}
      }
    },
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
        border-radius: 15px;
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
            max-height: 50px;
            font-size: 16px;
            margin-top: 7px;
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
            &__status {
              padding: 0;
              .v-radio {
                margin: 0;
              }
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
          margin-bottom: 10px;
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
        &__calendar {
          align-self: center;
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
        border-radius: 15px;
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
  .v-dialog {
    .create-new-task {
      background-color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 3px var(--blue-color) solid;
      border-radius: 10px;
      padding: 10px;
      h1 {
        margin-bottom: 10px;
        text-align: center;
        font-size: 20px;
      }
      &__close-dialog {
        background-color: transparent;
        color: black;
        align-self: flex-end;
      }
      &__form {
        &__date-picker {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
          span {
            margin-bottom: 10px;
          }
        }
      }
      &__submit {
        text-transform: capitalize;
        background-color: var(--green-color);
        color: white;
        margin: 10px 0;
      }
    }
  }
}
</style>
