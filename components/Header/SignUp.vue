<template>
  <div class="sign-up">
    <v-btn @click="logIn">Log In</v-btn>
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

<style lang="scss" scoped></style>
