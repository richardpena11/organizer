/* eslint-disable no-console */
export const state = () => ({
  FBApiKey: 'AIzaSyBYS7uWhmm1oDZowwZv0Ftu_cASKmxO-m4',
})

export const mutations = {}

export const actions = {
  getUserDataFromDB({ dispatch }, { collection, document, user }) {
    const db = this.$fire.firestore
    const docRef = db.collection(collection).doc(document)
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // User data does exists
          console.log('Document data:', doc.data())
        } else {
          // User data doesn't exists so it gets create it
          dispatch('createNewUser', { docRef, user })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  },

  createNewUser({ state }, { docRef, user }) {
    console.log('Creando documento')
    docRef
      .set({
        ...user,
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },
}
