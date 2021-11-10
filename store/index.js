/* eslint-disable no-console */
export const strict = false

export const state = () => ({
  userProjectsList: null,
  FBApiKey: 'AIzaSyBYS7uWhmm1oDZowwZv0Ftu_cASKmxO-m4',
})

export const mutations = {
  updateUserProjectsList(state, userProjectsList) {
    state.userProjectsList = userProjectsList
  },
}

export const actions = {
  // ----------------- USERS -------------------
  getUserDataFromDB({ commit, dispatch }, user) {
    const db = this.$fire.firestore
    const docRef = db.collection('users').doc(user.email)
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // User data does exists
          const data = doc.data()
          console.log('Document data:', data)
          commit('updateUserProjectsList', data.projects)
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
        projects: [],
      })
      .then(() => {
        console.log('Document successfully written!')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
  },

  // ----------------- PROJECTS ---------------

  createNewProject({ dispatch }, user) {
    const db = this.$fire.firestore
    const project = {
      title: 'Millionarie project',
      description: 'small description',
      finishDate: new Date(),
      Users: [db.doc(`users/${user.email}`)],
      tasks: [],
    }
    db.collection('projects')
      .add({ ...project })
      .then((doc) => {
        dispatch('createProjectInUserReference', { projectID: doc.id, user })
      })
      .catch((error) => console.log(error))
  },

  createProjectInUserReference({ state, commit }, { projectID, user }) {
    const db = this.$fire.firestore
    const docRef = db.collection('users').doc(user.email)
    const newProjectList = [
      ...state.userProjectsList,
      db.doc(`projects/${projectID}`),
    ]
    docRef
      .update({
        projects: [...newProjectList],
      })
      .then(() => {
        commit('updateUserProjectsList', newProjectList)
      })
  },
}
