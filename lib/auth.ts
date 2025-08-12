import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export async function signUp(email: string, password: string, name: string, role = "student") {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, {
      displayName: name
    })

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      created_at: new Date().toISOString()
    })

    return { data: user, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { data: userCredential.user, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: { message: error.message } }
  }
}

export async function getCurrentUser(): Promise<FirebaseUser | null> {
  return auth.currentUser
}

export async function getUserData(uid: string) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null }
    } else {
      return { data: null, error: { message: "User not found" } }
    }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}
