import { fireAuth, fireDb } from '@/plugins/firebase'

const collectionName = 'todos'

export const state = () => ({
  list: [],
  incrementId: 1
})

export const mutations = {
  add (state, { id, title, completed }) {
    state.list.push({
      id,
      title,
      completed
    })
  },
  removeTask (state, id) {
    state.list.splice(state.list.indexOf(id), 1)
  },
  set (state, todos) {
    state.list = todos
  }
}

export const actions = {
  async fetchFromDb  ({ commit }) {
    try {
      await fireDb.ref('todos').child(`user_${fireAuth.currentUser.uid}`).on('value', (snap) => {
        const todos = []
        for (const key in snap.val()) {
          todos.push({
            id: key,
            title: snap.val()[key].title,
            completed: snap.val()[key].completed
          })
        }
        commit('set', todos)
      })
    } catch (error) {
    }
  },
  async add ({ commit }, { title, completed }) {
    try {
      const todoKey = fireDb.ref().child('todos').push().key

      const addRef = await fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`).child(todoKey).set({
        title,
        completed,
        uid: fireAuth.currentUser.uid
      })
      commit('add', {
        id: addRef.uid,
        title,
        completed
      })
    } catch (error) {
    }
  },
  async toogle ({ commit }, todo) {
    await fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`).child(todo.id).update({
      completed: !todo.completed
    })
  },
  async editTask ({ commit }, { todo, etitle }) {
    if (etitle === '') {
      await fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`).child(todo.id).update({
        title: todo.title,
        completed: todo.completed,
        uid: fireAuth.currentUser.uid
      })
    } else {
      await fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`).child(todo.id).update({
        title: etitle
      })
    }
  },
  async removeTask ({ commit }, id) {
    await fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`).child(id).remove()
  },
  async removeAll ({ commit }) {
    const ref = fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`)
    await ref.once('value')
      .then((snap) => {
        snap.forEach(function (childSnapshot) {
          ref.child(childSnapshot.key).remove()
        })
      })
  },
  async removeCompleteTasks ({ commit }) {
    const ref = fireDb.ref(collectionName).child(`user_${fireAuth.currentUser.uid}`)
    await ref.orderByChild('completed')
      .equalTo(true)
      .once('value')
      .then((snap) => {
        snap.forEach(function (childSnapshot) {
          ref.child(childSnapshot.key).remove()
        })
      })
  }
}

export const getters = {
  todos (state) {
    return !!state.list !== []
  }
}
