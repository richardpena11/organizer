<template>
  <div>
    <v-text-field
      v-model="newProject.title"
      label="title"
      counter="30"
    ></v-text-field>
    <v-text-field
      v-model="newProject.description"
      label="description"
      counter="30"
    ></v-text-field>
    <v-date-picker v-model="newProject.finishDate" />
    <div>{{ newProject.title }}</div>
    <div>{{ newProject.description }}</div>
    <div>{{ newProject.finishDate }}</div>

    <v-btn @click="createNewProject">Submit</v-btn>
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

<style lang="scss" scoped></style>
