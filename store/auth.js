import { fireAuth, firebase, GoogleProvider } from '@/plugins/firebase'

export const state = () => ({
  user: null,
  loading: false,
  error: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}

export const actions = {
  async signup ({ commit }, { email, password, displayName }) {
    try {
      await fireAuth.createUserWithEmailAndPassword(email, password)
      const usera = fireAuth.currentUser
      usera.updateProfile({
        displayName
      })
    } catch (e) {
      commit('setError', e)
      setTimeout(() => {
        commit('clearError')
      }, 4000)
    }
  },
  async signin ({ dispatch, commit }, user) {
    try {
      commit('setLoading', true)
      await fireAuth.signInWithEmailAndPassword(user.email, user.password)
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      commit('setError', e)
      setTimeout(() => {
        commit('clearError')
      }, 4000)
    }
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
  async signInWithGoogle ({ commit, state, context }) {
    await fireAuth.signInWithPopup(GoogleProvider)
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
    commit('setUser', null)
  }
}

export const getters = {
  isAuth (state) {
    return !!state.user
  },
  activeUser (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
