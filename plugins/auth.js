import { fireAuth } from '@/plugins/firebase'

const checkUserStatus = ({ store }) => new Promise((resolve, reject) => {
  fireAuth.onAuthStateChanged((user) => {
    if (user) {
      const {
        uid,
        email,
        displayName,
        photoURL
        // emailVerified,
        // refreshToken
      } = user
      store.commit('auth/setUser', {
        uid,
        email,
        displayName,
        photoURL
        // emailVerified,
        // refreshToken
      })
      //  eslint-disable-next-line no-console
      console.log(store.state.auth.user)
      // eslint-disable-next-line no-console
      // console.log(user)
    }
    // } else {
    //   store.commit('auth/setUser', user)
    // }
    resolve(user)
  }, err => reject(err))
})

export default checkUserStatus
