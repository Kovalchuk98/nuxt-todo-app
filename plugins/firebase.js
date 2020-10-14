import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID
  }
  firebase.initializeApp(firebaseConfig)
}

const fireDb = firebase.database()
const fireAuth = firebase.auth()
const GoogleProvider = new firebase.auth.GoogleAuthProvider()

export {
  firebase,
  fireDb,
  fireAuth,
  GoogleProvider
}
