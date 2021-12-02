<template>
  <div class="create-new-project">
    <h1>Nuevo Proyecto</h1>
    <v-form class="create-new-project__form">
      <div class="create-new-project__form__container">
        <div class="create-new-project__form__container__text-inputs">
          <v-text-field
            v-model="newProject.title"
            label="Título"
            counter="30"
            single-line
            outlined
            required
            :error-messages="titleErrors"
            @input="$v.newProject.title.$touch()"
            @blur="$v.newProject.title.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="newProject.description"
            label="Descripción"
            counter="30"
            single-line
            outlined
            required
            :error-messages="descriptionErrors"
            @input="$v.newProject.description.$touch()"
            @blur="$v.newProject.description.$touch()"
          ></v-text-field>
        </div>
        <div class="create-new-project__form__container__date-picker">
          <span>Seleccione la fecha de finalización</span>
          <v-date-picker
            v-model="newProject.finishDate"
            :min-date="new Date()"
          ></v-date-picker>
        </div>
      </div>
      <v-btn @click="createNewProject">Crear nuevo proyecto</v-btn>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  layout: 'dashboard',
  data() {
    return {
      newProject: {
        title: '',
        description: '',
        finishDate: '',
        users: [],
        tasks: [],
      },
    }
  },

  validations: {
    newProject: {
      title: { required, maxLength: maxLength(30) },
      description: { required, maxLength: maxLength(30) },
    },
  },

  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.newProject.title.$dirty) return errors
      !this.$v.newProject.title.required &&
        errors.push('Es requerido un título')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.newProject.description.$dirty) return errors
      !this.$v.newProject.description.required &&
        errors.push('Es requerida una descripción')
      return errors
    },
  },

  methods: {
    createNewProject() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = this.$auth.$state.user
        this.$store.dispatch('createNewProject', {
          user,
          newProject: this.newProject,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-new-project {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  margin-top: 35px;
  padding: 20px;
  border: 2px var(--blue-color) solid;
  border-radius: 10px;
  h1 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 20px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 30px;
    &__container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      &__text-inputs {
        width: 40%;
        max-width: 400px;
        padding: 10px;
        .v-text-field {
          margin-top: 25px;
        }
      }
      &__date-picker {
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 400px;
        span {
          text-align: center;
          margin-bottom: 15px;
        }
      }
    }
  }
  .v-btn {
    margin-top: 30px;
    text-transform: capitalize;
    background-color: var(--green-color);
    color: white;
    max-width: 200px;
    align-self: center;
  }
}
</style>
