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
        border="2px solid #000"
        accept="image/jpeg,image/png"
        size="10"
        :hide-change-button="true"
        :custom-strings="{
          drag: `<h2>Profile Picture</h2>`,
        }"
        @change="onChange"
      />
      <!-- ---------- Name Input ---------- -->
      <div v-if="isSigningUp" class="sign-up__form__name">
        <label for="name">Name</label>
        <input v-model.trim="$v.name.$model" name="name" type="text" />
        <span v-if="$v.name.$invalid && $v.name.$dirty" class="error">
          Name is required.
        </span>
      </div>
      <!-- ---------- Email Input ---------- -->
      <div class="sign-up__form__email">
        <label for="email">Email</label>
        <input v-model.trim="$v.email.$model" name="email" type="email" />
        <span v-if="!$v.email.email" class="error">
          Must be a valid Email.
        </span>
        <span v-else-if="$v.email.$invalid && $v.email.$dirty" class="error">
          Email is required.
        </span>
      </div>
      <!-- ---------- Password Input ---------- -->
      <div class="sign-up__form__password">
        <label for="password">Password</label>
        <input
          v-model.trim="$v.password.$model"
          name="password"
          type="password"
        />
        <span v-if="!$v.password.maxLength" class="error">
          Password must not have more than
          {{ $v.password.$params.maxLength.max }} characters.
        </span>
        <span v-else-if="!$v.password.minLength" class="error">
          Password must have at least
          {{ $v.password.$params.minLength.min }} characters.
        </span>
        <span
          v-else-if="$v.password.$invalid && $v.password.$dirty"
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
              @click="changeSignUp"
            >
              {{ !isSigningUp ? 'Sign Up' : 'Sign in' }}
            </span>
          </span>
        </div>
        <div v-if="error" class="sign-up__form__action__error">
          <v-snackbar v-model="snackbar" :timeout="-1" fixed top centered>
            {{ error }}
            <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
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
      password: '',
      name: '',
      email: '',
      isSigningUp: true,
      error: '',
      snackbar: false,
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
    email: {
      required,
      email,
    },
  },
  methods: {
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    changeSignUp() {
      this.isSigningUp ? (this.isSigningUp = false) : (this.isSigningUp = true)
    },
    signIn() {
      this.$v.$touch()
      if (!this.$v.email.$invalid || !this.$v.password.$invalid) {
        console.log('Sign In')
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            console.log(userCredential)
          })
          .catch((error) => {
            this.error = error.message
            this.snackbar = true
          })
      }
    },
    signUp() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            console.log(userCredential)
            const user = this.$fire.auth.currentUser
            user
              .updateProfile({
                displayName: 'Jane Q. User',
              })
              .then(() => {
                console.log(user)
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            this.error = error.message
            this.snackbar = true
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sign-up {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  min-height: 475px;
  font-family: 'Roboto', sans-serif;
  width: 320px;
  &__title {
    text-align: center;
    color: #001847;
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
      color: #001847;
      font-weight: 800;
      margin-top: 10px;
      label {
        margin-bottom: 10px;
      }
      input {
        height: 30px;
        padding: 0px 10px;
        border: #0f5ef7 1.5px solid;
        border-radius: 10px;
        background-color: #f2f5fd;
        font-weight: 400;
        font-size: 14px;
      }
      .error {
        position: absolute;
        bottom: -20px;
        right: 0;
        color: red;
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
}
</style>
