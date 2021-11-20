<template>
  <div class="sign-up">
    <v-btn color="#00bc8b" @click="logIn">Inicar sesión</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    logIn() {
      this.$auth.loginWith('auth0')
    },
  },
}
</script>

<style lang="scss" scoped>
.v-btn {
  color: white;
}
</style>
