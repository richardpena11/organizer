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
  height: 600px;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  background: linear-gradient(to right, #001847, #0f5ef7);
  clip-path: polygon(100% 0, 100% 80%, 50% 100%, 0 80%, 0 0);
  .header {
    max-width: 1000px;
    width: 90%;
    display: flex;
    font-family: 'Roboto', sans-serif;
  }
}
</style>
