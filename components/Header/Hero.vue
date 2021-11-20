<template>
  <div class="hero">
    <div class="hero__title">
      <h1>Schimed</h1>
    </div>
    <div class="hero__slogan">
      <h2 class="hero__slogan__principal">Organiza tus proyectos</h2>
      <h3 class="hero__slogan__secondary">Monitorea tus tareas</h3>
    </div>
    <div class="hero__sponsor">
      <span>Software para:</span>
      <img
        src="https://www.alcaldiasandiego.net/appweb/css/img/san_diego_logo.png"
        alt=""
      />
    </div>
    <span class="hero__about">Sobre la Institución:</span>
    <p class="hero__description">
      La Alcaldía es un ente público, constituye parte del Poder Municipal que
      está regido por la Ley Orgánica del Poder Público Municipal. En esta Ley
      se definen sus atribuciones esenciales que tienen que ver con la atención
      de los servicios públicos, la defensa de la naturaleza y el mejoramiento
      continuo de la calidad de vida de los habitantes de cada territorio.
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  &__title {
    font-size: 38px;
    color: #001847;
  }
  &__slogan {
    height: 70px;
    padding: 0px 20px;
    margin-bottom: 15px;
    border-left: 3px solid var(--yellow-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #001847;
    &__principal {
      font-size: 28px;
    }
    &__secondary {
      font-size: 24px;
    }
  }
  &__sponsor {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 20px;
    img {
      width: 350px;
      margin: -20px 0;
      align-self: center;
    }
  }
  &__about {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
  &__description {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 20px;
    text-align: justify;
  }
}
</style>
