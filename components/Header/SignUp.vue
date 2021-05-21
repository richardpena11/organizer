<template>
  <div>
    <div class="sign-up">
      <div class="sign-up__title">Sign Up</div>
      <form class="sign-up__form" @submit.prevent="submit">
        <div class="sign-up__form__name">
          <label for="name">Name</label>
          <input v-model.trim="$v.name.$model" name="name" type="text" />
          <span v-if="$v.name.$invalid && $v.name.$dirty" class="error">
            Name is required.
          </span>
        </div>
        <div class="sign-up__form__email">
          <label for="email">Email</label>
          <input v-model.trim="$v.correo.$model" name="email" type="email" />
          <span v-if="$v.correo.$invalid && $v.correo.$dirty" class="error">
            Email is required.
          </span>
          <span v-if="!$v.correo.email" class="error">
            Must be a valid Email.
          </span>
        </div>
        <div class="sign-up__form__password">
          <label for="password">Password</label>
          <input
            v-model.trim="$v.password.$model"
            name="password"
            type="password"
          />
          <span v-if="$v.password.$invalid && $v.password.$dirty" class="error">
            Password is required.
          </span>
          <span v-if="!$v.password.minLength" class="error">
            Password must have at least
            {{ $v.password.$params.minLength.min }} characters.
          </span>
          <span v-if="!$v.password.maxLength" class="error">
            Password must not have more than
            {{ $v.password.$params.maxLength.max }} characters.
          </span>
        </div>
        <div class="sign-up__form__switch">
          <span class="sign-up__form__switch__text">
            Already have an account? Then
            <a class="sign-up__form__switch__link" href="#"> Log In </a>
          </span>
        </div>
        <button class="sign-up__form__submit" @click="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      password: '',
      name: '',
      correo: '',
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(10),
    },
    name: {
      required,
    },
    correo: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-up {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  font-family: 'Roboto', sans-serif;
  width: 320px;
  position: relative;
  top: 60px;
  right: -20%;
  &__title {
    text-align: center;
    color: #001847;
    font-weight: 700;
    font-size: 24px;
  }
  &__form {
    div {
      display: flex;
      flex-direction: column;
      color: #001847;
      font-weight: 800;
      margin-top: 20px;
      label {
        margin-bottom: 10px;
      }
      input {
        border: #0f5ef7 1.5px solid;
        border-radius: 10px;
        height: 30px;
        background-color: #f2f5fd;
        font-weight: 400;
        font-size: 14px;
      }
      .error {
        color: red;
        font-weight: 400;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    &__switch {
      margin-bottom: 15px;
      font-family: 'Roboto Condensed', sans-serif;
      &__text {
        font-size: 16px;
        text-align: center;
        font-weight: 400;
      }
      &__link {
        font-weight: 700;
        text-decoration: none;
        color: #0f5ef7;
        transition: color 500ms;
        &:hover {
          color: #001847;
        }
      }
    }
    &__submit {
      background-color: #00bc8b;
      font-family: 'Roboto', sans-serif;
      color: white;
      padding: 8px 0;
      text-align: center;
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
