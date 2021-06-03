<template>
  <div class="hero">
    <div class="hero__title">
      <h1>Organizer</h1>
    </div>
    <div class="hero__slogan">
      <h2 class="hero__slogan__principal">Organize Your Projects</h2>
      <h3 class="hero__slogan__secondary">Any kind of slogan</h3>
    </div>
    <p class="hero__description">
      Any Lorem ipsum dolor sit amet, consectetur adipiscing elit Vestibulum
      porta eros at magna faucibus, at sagittis ante vestibulum tincidunt
      laoreet malesuada. Praesent. of slogan
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero {
  width: 600px;
  height: 80%; // This depend of .header-container clip-path
  color: var(--white-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__title {
    font-size: 38px;
    margin-bottom: 30px;
  }
  &__slogan {
    height: 70px;
    padding: 0px 20px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-left: 3px solid var(--yellow-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__principal {
      font-size: 28px;
    }
    &__secondary {
      font-size: 24px;
    }
  }
  &__description {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 20px;
  }
}
</style>
