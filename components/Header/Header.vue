<template>
  <div class="header-container">
    <header class="header">
      <Hero />

      <SignUp />
    </header>
  </div>
</template>

<script>
import Hero from './Hero'
import SignUp from './SignUp'

export default {
  components: {
    Hero,
    SignUp,
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  background-color: #e9effe;
  .header {
    max-width: 1000px;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
  }
}
</style>
