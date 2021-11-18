/* eslint-disable no-console */
export const strict = false

export const state = () => ({
  userProjectsList: [],
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
          commit('updateUserProjectsList', data.projects)
          console.log(this.$router)
        } else {
          // User data doesn't exists so it gets create it
          dispatch('createNewUser', { docRef, user })
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  },

  createNewUser({ commit }, { docRef, user }) {
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

  getProjectData({ state }, projectID) {
    const projectList = state.userProjectsList
    console.log(projectList)
  },

  createNewProject({ dispatch }, { user, newProject }) {
    const db = this.$fire.firestore
    db.collection('projects')
      .add({ ...newProject, Users: [db.doc(`users/${user.email}`)] })
      .then((doc) => {
        dispatch('createProjectInUserReference', {
          projectID: doc.id,
          title: newProject.title,
          description: newProject.description,
          finishDate: newProject.finishDate,
          user,
        })
      })
      .catch((error) => console.log(error))
  },

  createProjectInUserReference(
    { state, commit },
    { projectID, title, description, finishDate, user }
  ) {
    const db = this.$fire.firestore
    const docRef = db.collection('users').doc(user.email)
    const newProjectList = [
      ...state.userProjectsList,
      {
        title,
        description,
        finishDate,
        ID: projectID,
        reference: db.doc(`projects/${projectID}`),
      },
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
