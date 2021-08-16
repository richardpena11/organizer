<template>
  <div class="sign-up">
    <div class="sign-up__title">
      {{ isSigningUp ? 'Sign Up' : 'Sign in' }}
    </div>
    <form
      class="sign-up__form"
      @submit.prevent="isSigningUp ? signUp() : signIn()"
    >
      <!-- ---------- Profile Picture Input ---------- -->
      <picture-input
        v-if="isSigningUp"
        ref="pictureInput"
        class="sign-up__form__picture-input"
        width="100"
        height="100"
        radius="50"
        accept="image/jpeg,image/png"
        size="2"
        :hide-change-button="true"
        :custom-strings="{
          drag: `<h2>Profile Picture</h2>`,
        }"
        @change="onChangeProfilePicture"
      />
      <!-- ---------- Name Input ---------- -->
      <div v-if="isSigningUp" class="sign-up__form__name">
        <label for="name">Name</label>
        <input v-model.trim="$v.user.name.$model" name="name" type="text" />
        <span v-if="$v.user.name.$invalid && $v.user.name.$dirty" class="error">
          Name is required.
        </span>
      </div>
      <!-- ---------- Email Input ---------- -->
      <div class="sign-up__form__email">
        <label for="email">Email</label>
        <input v-model.trim="$v.user.email.$model" name="email" type="email" />
        <span v-if="!$v.user.email.email" class="error">
          Must be a valid Email.
        </span>
        <span
          v-else-if="$v.user.email.$invalid && $v.user.email.$dirty"
          class="error"
        >
          Email is required.
        </span>
      </div>
      <!-- ---------- Password Input ---------- -->
      <div class="sign-up__form__password">
        <label for="password">Password</label>
        <input
          v-model.trim="$v.user.password.$model"
          name="password"
          type="password"
        />
        <span v-if="!$v.user.password.maxLength" class="error">
          Password must not have more than
          {{ $v.user.password.$params.maxLength.max }} characters.
        </span>
        <span v-else-if="!$v.user.password.minLength" class="error">
          Password must have at least
          {{ $v.user.password.$params.minLength.min }} characters.
        </span>
        <span
          v-else-if="$v.user.password.$invalid && $v.user.password.$dirty"
          class="error"
        >
          Password is required.
        </span>
      </div>
      <div class="sign-up__form__action">
        <!-- ---------- Switch Sign Up/Sign In ---------- -->
        <div class="sign-up__form__action__switch">
          <span class="sign-up__form__action__switch__text">
            {{ isSigningUp ? 'Already' : "Don't" }} have an account? Then
            <span
              class="sign-up__form__action__switch__link"
              @click="switchSignUp"
            >
              {{ !isSigningUp ? 'Sign Up' : 'Sign in' }}
            </span>
          </span>
        </div>
        <div v-if="errorSnackbar" class="sign-up__form__action__error">
          <v-snackbar v-model="errorSnackbar" :timeout="-1" fixed top centered>
            {{ errorSnackbar }}
            <v-btn color="blue" text @click="deleteErrorSnackbar">Close</v-btn>
          </v-snackbar>
        </div>
        <!-- ---------- Submit Form ---------- -->
        <button class="sign-up__form__action__submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      user: {
        image: '',
        name: '',
        email: '',
        password: '',
      },
      isSigningUp: true,
    }
  },
  validations: {
    user: {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10),
      },
      name: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    errorSnackbar() {
      return this.$store.state.errorSnackbar
    },
  },
  methods: {
    onChangeProfilePicture(image) {
      if (image) {
        this.user.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    deleteErrorSnackbar() {
      this.$store.commit('updatedErrorSnackbar', '')
    },
    switchSignUp() {
      this.isSigningUp ? (this.isSigningUp = false) : (this.isSigningUp = true)
    },
    signIn() {
      this.$v.$touch()
      if (!this.$v.user.email.$invalid && !this.$v.user.password.$invalid) {
        this.$store.dispatch('signIn', this.user)
      }
    },
    signUp() {
      this.$v.$touch()
      if (!this.$v.user.$invalid) {
        this.$store.dispatch('signUp', this.user)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-up {
  width: 320px;
  min-height: 475px;
  padding: 15px;
  position: relative;
  border-radius: 10px;
  background-color: var(--white-color);
  font-family: 'Roboto', sans-serif;
  &__title {
    text-align: center;
    color: var(--dark-blue-color);
    font-weight: 700;
    font-size: 24px;
  }
  &__form {
    &__picture-input {
      margin-top: 20px;
    }
    &__name,
    &__email,
    &__password {
      display: flex;
      flex-direction: column;
      position: relative;
      color: var(--dark-blue-color);
      font-weight: 800;
      margin-top: 10px;
      label {
        margin-bottom: 10px;
      }
      input {
        height: 30px;
        padding: 0px 10px;
        border: var(--dark-blue-color) 1px solid;
        border-radius: 10px;
        background-color: var(--shadow-brighter-color);
        font-weight: 400;
        font-size: 14px;
      }
      .error {
        position: absolute;
        bottom: -20px;
        right: 0;
        color: var(--red-color);
        font-weight: 400;
        font-size: 12px;
        margin-top: 5px;
      }
    }
    &__action {
      width: 100%;
      padding: 15px;
      position: absolute;
      left: 0;
      bottom: 0;
      &__switch {
        margin-bottom: 15px;
        font-family: 'Roboto Condensed', sans-serif;
        &__text {
          display: block;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
        }
        &__link {
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          color: var(--blue-color);
          transition: color 500ms;
          &:hover {
            color: var(--dark-blue-color);
          }
        }
      }
      &__submit {
        background-color: var(--green-color);
        font-family: 'Roboto', sans-serif;
        color: var(--white-color);
        padding: 8px 0;
        text-align: center;
        width: 100%;
        border-radius: 10px;
      }
    }
  }
}
</style>
