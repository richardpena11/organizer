/* eslint-disable no-console */
export const strict = false

export const state = () => ({
  actualProjectID: null,
  currentProject: null,
  userProjectsList: [],
  FBApiKey: 'AIzaSyBYS7uWhmm1oDZowwZv0Ftu_cASKmxO-m4',
})

export const mutations = {
  updateUserProjectsList(state, userProjectsList) {
    state.userProjectsList = userProjectsList
  },

  saveActualProjectID(state, actualProjectID) {
    state.actualProjectID = actualProjectID
  },

  saveCurrentProject(state, currentProject) {
    state.currentProject = currentProject
  },

  updateTaskStatusState(state, statusUpdate) {
    state.currentProject.tasks[statusUpdate.index].status = statusUpdate.value
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

  getCurrentProject({ state, commit }) {
    const db = this.$fire.firestore
    const projectRef = db.doc(`projects/${state.actualProjectID}`)
    projectRef
      .get()
      .then((doc) => {
        commit('saveCurrentProject', doc.data())
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  },

  createNewProject({ dispatch }, { user, newProject }) {
    const db = this.$fire.firestore
    const newProjectWithUser = {
      ...newProject,
      users: [
        {
          nickname: user.nickname,
          picture: user.picture,
          reference: [db.doc(`users/${user.email}`)],
        },
      ],
    }
    db.collection('projects')
      .add({ ...newProjectWithUser })
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
    { state, dispatch, commit },
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
        dispatch('getUserDataFromDB', state.auth.user)
      })
  },

  updateTaskslist({ state, commit, dispatch }, newTasksList) {
    const db = this.$fire.firestore
    const docRef = db.collection('projects').doc(state.actualProjectID)
    docRef
      .update({
        tasks: [...newTasksList],
      })
      .then(() => {
        dispatch('getUserDataFromDB', state.auth.user)
      })
  },

  updateTaskStatus({ state, commit, dispatch }, statusUpdate) {
    commit('updateTaskStatusState', statusUpdate)
    dispatch('updateTaskslist', state.currentProject.tasks)
  },
}
