<template>
  <div class="create-new-project">
    <h1>Nuevo Proyecto</h1>
    <div class="create-new-project__form">
      <div class="create-new-project__form__text-inputs">
        <v-text-field
          v-model="newProject.title"
          label="Título"
          counter="30"
          single-line
          outlined
        ></v-text-field>
        <v-text-field
          v-model="newProject.description"
          label="Descripción"
          counter="30"
          single-line
          outlined
        ></v-text-field>
      </div>
      <div class="create-new-project__form__date-picker">
        <span>Seleccione la fecha de finalización</span>
        <v-date-picker v-model="newProject.finishDate" />
      </div>
    </div>
    <div>{{ newProject.title }}</div>
    <div>{{ newProject.description }}</div>
    <div>{{ newProject.finishDate }}</div>
    <v-btn @click="createNewProject">Crear nuevo proyecto</v-btn>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      newProject: {
        title: '',
        description: '',
        finishDate: '',
        Users: [],
        Tasks: [],
      },
    }
  },

  methods: {
    createNewProject() {
      const user = this.$auth.$state.user
      this.$store.dispatch('createNewProject', {
        user,
        newProject: this.newProject,
      })
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
    justify-content: space-around;
    width: 100%;
    margin-bottom: 30px;
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
  .v-btn {
    margin-top: 30px;
    text-transform: capitalize;
    background-color: var(--green-color);
    color: white;
  }
}
</style>
