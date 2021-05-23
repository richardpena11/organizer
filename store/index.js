export const state = () => ({
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
  errorSnackbar: '',
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
}

export const actions = {
  signIn({ commit }, { email, password }) {
    this.$fire.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        commit('updatedUser', userCredential.user)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        commit('updatedErrorSnackbar', error.message)
      })
  },
  uploadImage({ state }, userInfo) {
    if (userInfo.image) {
      // Converting image/Base64 to Blob
      const imageUrl = fetch(userInfo.image)
        .then((res) => res.blob())
        .then((imageBlob) => {
          // Uploading image/Blob to firebase Storage
          const storageRef = this.$fire.storage.ref()
          const imageRef = storageRef.child(
            `profile-pictures/${userInfo.email}`
          )
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
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
  async updatedUser({ commit, dispatch }, userInfo) {
    console.log(userInfo)
    if (userInfo.name) {
      // Getting image URL
      const imageUrl = await dispatch('uploadImage', userInfo)
      // Updating user with name and profile picture
      console.log(userInfo)
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
          name,
          email,
          image,
        }
        dispatch('updatedUser', userInfo)
        this.$router.push('/dashboard')
      })
      .catch((error) => {
        commit('updatedErrorSnackbar', error.message)
      })
  },
}
