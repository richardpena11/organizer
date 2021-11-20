<template>
  <div class="loading-screen">
    <div class="loader"></div>
    <span>Por favor espere un momento...</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.loading-screen {
  background-color: var(--ligth-blue-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35vh 0;
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin-bottom: 20px;
  }
  span {
    color: var(--dark-blue-color);
    font-size: 20px;
    font-weight: 500;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
