import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDGGMo2Ny_8elKoxhCPtpPS8jP1kI1XFmU',
  authDomain: 'binh-an-coffee.firebaseapp.com',
  projectId: 'binh-an-coffee',
  storageBucket: 'binh-an-coffee.firebasestorage.app',
  messagingSenderId: '661552409945',
  appId: '1:661552409945:web:2d51d23cd04c4fee4eb048',
  measurementId: 'G-0X1XMTJ540'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
