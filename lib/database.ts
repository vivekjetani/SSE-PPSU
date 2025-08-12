import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  where,
  Timestamp 
} from "firebase/firestore"
import { db } from "./firebase"

export async function getAnalytics() {
  try {
    const analyticsRef = collection(db, "analytics")
    const q = query(analyticsRef, orderBy("date", "desc"), limit(1))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { data: { id: doc.id, ...doc.data() }, error: null }
    }
    
    return { data: null, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export async function getNotifications(limitCount = 5) {
  try {
    const notificationsRef = collection(db, "notifications")
    const q = query(notificationsRef, orderBy("timestamp", "desc"), limit(limitCount))
    const querySnapshot = await getDocs(q)
    
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { data: notifications, error: null }
  } catch (error: any) {
    return { data: [], error: { message: error.message } }
  }
}

export async function createNotification(notification: {
  title: string
  body: string
  created_by: string
}) {
  try {
    const notificationsRef = collection(db, "notifications")
    const docRef = await addDoc(notificationsRef, {
      ...notification,
      timestamp: Timestamp.now()
    })
    
    return { data: { id: docRef.id, ...notification }, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export async function getUsers() {
  try {
    const usersRef = collection(db, "users")
    const querySnapshot = await getDocs(usersRef)
    
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { data: users, error: null }
  } catch (error: any) {
    return { data: [], error: { message: error.message } }
  }
} 