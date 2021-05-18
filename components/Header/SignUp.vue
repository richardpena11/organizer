<template>
  <div>
    <div class="sign-up">
      <div class="sign-up__title">Sign Up</div>
      <form class="sign-up__form">
        <div class="sign-up__form__name">
          <label for="name">Name</label>
          <input name="name" type="text" />
        </div>
        <div class="sign-up__form__email">
          <label for="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div class="sign-up__form__password">
          <label for="password">Password</label>
          <input name="password" type="password" />
        </div>
        <div class="sign-up__form__switch">
          Already have an account? then <a href="#">Log In</a>
        </div>
        <button class="sign-up__form__submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
