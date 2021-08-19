export const state = () => ({
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
  credential: '',
  FBApiKey: 'AIzaSyBYS7uWhmm1oDZowwZv0Ftu_cASKmxO-m4',
})

export const mutations = {
  updatedUser(state, { displayName, email, photoURL, uid }) {
    if (displayName) state.user.displayName = displayName
    if (email) state.user.email = email
    if (photoURL) state.user.photoURL = photoURL
    if (uid) state.user.uid = uid
  },

  updatedErrorSnackbar(state, error) {
    state.errorSnackbar = error
  },

  updateCredential(state, credential) {
    state.credential = credential
  },
}

export const actions = {
  signIn({ commit, dispatch }, { email, password }) {
    this.$fire.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        commit('updatedUser', userCredential.user)
        dispatch('createRefreshToken', userCredential)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        commit('updatedErrorSnackbar', error.message)
      })
  },
  uploadImageToStorage({ state }, userInfo) {
    if (userInfo.image) {
      // The Blob is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a ReadableStream so its methods can be used for processing the data.

      // Converting image/Base64 to Blob
      const imageUrl = fetch(userInfo.image)
        .then((res) => res.blob())
        .then((imageBlob) => {
          // Uploading image/Blob to firebase Storage
          const storageRef = this.$fire.storage.ref()
          const imageRef = storageRef.child(`profile-pictures/${userInfo.uid}`)
          const imageUrl = imageRef.put(imageBlob).then((snapshot) => {
            // Getting Image Url from firebase Storage
            const imageUrl = imageRef
              .getDownloadURL()
              .then((url) => {
                return url
              })
              .catch((error) => {
                console.log(error)
              })
            return imageUrl
          })
          return imageUrl
        })
      return imageUrl
    }
  },
  saveUserInDatabase({ commit }, user) {
    const { displayName, email, photoURL, uid } = user
    const db = this.$fire.firestore
    db.collection('users')
      .doc(uid)
      .set({
        displayName,
        email,
        photoURL,
      })
      .then(() => {
        commit('updatedUser', user)
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async saveUserAndProfilePicture({ commit, dispatch }, userInfo) {
    if (userInfo.name) {
      // Getting image URL
      const imageUrl = await dispatch('uploadImageToStorage', userInfo)
      // Updating user with name and profile picture
      userInfo.credential
        .updateProfile({
          displayName: userInfo.name,
          photoURL: imageUrl,
        })
        .then(() => {
          dispatch('saveUserInDatabase', userInfo.credential)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  signUp({ commit, dispatch }, user) {
    const { name, email, password, image } = user
    this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userInfo = {
          credential: userCredential.user,
          uid: userCredential.user.uid,
          name,
          email,
          image,
        }
        console.log(userInfo)
        dispatch('saveUserAndProfilePicture', userInfo)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        commit('updatedErrorSnackbar', error.message)
      })
  },
  createRefreshToken({ state, commit }, userCredential) {
    // this.$fire.auth.currentUser
    //   .getIdToken(/* forceRefresh */ true)
    //   .then((idToken) => {
    //     state.idToken = idToken
    //     localStorage.setItem('idToken', this.$fire.auth.currentUser)
    //   })
    // fetch(
    //   `
    //     https://securetoken.googleapis.com/v1/token?key=${state.FBApiKey}&grant_type=refresh_token&refresh_token=${userInfo.refreshToken}
    //   `,
    //   {
    //     method: 'POST',
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((authData) => {
    //     console.log(authData)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  },
  checkIfUserWasLogedIn() {},
}
