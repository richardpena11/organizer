<template>
  <div v-if="project" class="projects-container" data-app>
    <div class="projects">
      <div class="project-display">
        <div class="task-list">
          <h4 class="task-list__title">Lista de Tareas</h4>
          <div
            v-for="(task, index) in project.tasks"
            :key="index"
            class="task-list__item"
          >
            <div v-if="!task.date.date" class="task-list__item__date">
              <span>{{ task.date.toDate().getMonth() + 1 }}</span>
              <span>{{ task.date.toDate().getUTCDate() }}</span>
            </div>
            <div class="task-list__item__info">
              <div class="task-list__item__info__description">
                <h4>{{ task.title }}</h4>
              </div>
              <v-radio-group
                ref="radioGroup"
                class="task-list__item__info__status"
                row
                :value="task.status"
                @change="changeTaskStatus($event, index)"
              >
                <v-radio color="#D50000" value="todo"></v-radio>
                <v-radio color="#F9A825" value="doing"></v-radio>
                <v-radio color="#388E3C" value="done"></v-radio>
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
          </div>
          <no-ssr>
            <v-calendar
              class="project-info__calendar"
              :columns="2"
              :attributes="attributes"
            ></v-calendar>
          </no-ssr>
        </div>
        <div class="project-users-list">
          <h4 class="project-users-list__title">Usuarios</h4>
          <div
            v-for="(user, index) in project.users"
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
        <v-form class="create-new-task__form">
          <v-text-field
            v-model="newTask.title"
            label="Título"
            counter="30"
            light
            single-line
            outlined
            required
            :error-messages="titleErrors"
            @input="$v.newTask.title.$touch()"
            @blur="$v.newTask.title.$touch()"
          ></v-text-field>
          <div class="create-new-task__form__date-picker">
            <span>Seleccione la fecha de finalización</span>
            <no-ssr>
              <v-date-picker v-model="newTask.date" :min-date="new Date()" />
            </no-ssr>
          </div>
          <v-btn class="create-new-task__submit" @click="addnewTask"
            >Añadir nueva tarea</v-btn
          >
        </v-form>
      </div>
    </v-dialog>
    <div class="leyenda">
      Formato&nbsp;
      <div class="formato">
        <span>MM</span>
        <span>DD</span>
      </div>
      <span class="rojo">&nbsp;&nbsp;rojo:&nbsp;</span>
      sin realizar&nbsp;&nbsp;
      <span class="amarillo">amarillo:&nbsp;</span>
      realizándose&nbsp;&nbsp;
      <span class="verde">verde:&nbsp;</span>
      realizado&nbsp;
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'dashboard',
  data() {
    return {
      dialog: false,
      newTask: {
        title: '',
        date: '',
        status: 'todo',
      },
    }
  },
  auth: true,

  validations: {
    newTask: {
      title: { required, maxLength: maxLength(30) },
    },
  },

  computed: {
    project() {
      const project = this.$store.state.currentProject
      if (project) {
        if (typeof project.finishDate !== typeof '') {
          project.finishDate = project.finishDate.toDate().toDateString()
        }
        return project
      } else {
        return {}
      }
    },
    titleErrors() {
      const errors = []
      if (!this.$v.newTask.title.$dirty) return errors
      !this.$v.newTask.title.required && errors.push('Es requerido un título')
      return errors
    },
    attributes() {
      if (this.$store.state.currentProject) {
        const tasksList = this.$store.state.currentProject.tasks
        const tasksOnVCalendar = []
        for (const task of tasksList) {
          let color
          if (task.status === 'done') {
            color = 'green'
          } else if (task.status === 'doing') {
            color = 'yellow'
          } else {
            color = 'red'
          }
          tasksOnVCalendar.push({
            dates: task.date.toDate(),
            bar: color,
            popover: {
              label: task.title,
            },
          })
        }
        return tasksOnVCalendar
      }
      return []
    },
  },

  methods: {
    logOut() {
      this.$auth.logout()
    },

    addnewTask() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const currentTasksList = this.$store.state.currentProject.tasks
        const newTasksList = [...currentTasksList, this.newTask]
        this.$store.dispatch('updateTaskslist', newTasksList)
      }
    },

    changeTaskStatus(value, index) {
      const statusUpdate = {
        value,
        index,
      }
      this.$store.dispatch('updateTaskStatus', statusUpdate)
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
        height: 450px;
        padding: 20px 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: auto;
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
              min-width: 75px;
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
                text-transform: capitalize;
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
        margin: 10px 50px;
      }
    }
  }
  .leyenda {
    display: flex;
    font-weight: bold;
    position: relative;
    top: -510px;
    .formato {
      display: flex;
      flex-direction: column;
    }
    .rojo {
      color: #d50000;
    }
    .amarillo {
      color: #f9a825;
    }
    .verde {
      color: #388e3c;
    }
  }
}
</style>
