import { fireAuth } from '@/plugins/firebase'

const checkUserStatus = ({ store }) => new Promise((resolve, reject) => {
  fireAuth.onAuthStateChanged((user) => {
    if (user) {
      const {
        uid,
        email,
        displayName,
        photoURL
        // refreshToken
      } = user
      store.commit('auth/setUser', {
        uid,
        email,
        displayName,
        photoURL
        // refreshToken
      })
    }
    resolve(user)
  }, err => reject(err))
})

export default checkUserStatus
