import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase.js'

export function loginStaff(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logoutStaff() {
  return signOut(auth)
}

export function watchStaffAuth(callback) {
  return onAuthStateChanged(auth, callback)
}
