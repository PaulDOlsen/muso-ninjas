import { defineBoot } from '#q-app/wrappers'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { VueFire, VueFireAuth } from 'vuefire'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByUYSnllLlrNGURqF0PMOFZW-gVJeiFoc',
  authDomain: 'muso-ninjas-af99e.firebaseapp.com',
  projectId: 'muso-ninjas-af99e',
  storageBucket: 'muso-ninjas-af99e.firebasestorage.app',
  messagingSenderId: '218339033898',
  appId: '1:218339033898:web:a14046676a5d451319d453',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export default defineBoot(({ app: vueApp }) => {
  vueApp.use(VueFire, {
    firebaseApp: app,
    modules: [VueFireAuth()],
  })
})

export { app, db, auth }
