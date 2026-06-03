import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from './firebase.js'

export const orderStatuses = {
  new: 'Mới',
  preparing: 'Đang làm',
  ready: 'Sẵn sàng',
  served: 'Đã phục vụ',
  cancelled: 'Đã hủy'
}

export async function createOrder(order) {
  const ref = await addDoc(collection(db, 'orders'), {
    ...order,
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })
  return ref.id
}

export function subscribeToActiveOrders(onNext, onError) {
  const q = query(
    collection(db, 'orders'),
    where('status', 'in', ['new', 'preparing', 'ready']),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, snapshot => {
    onNext(snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    })))
  }, onError)
}

export async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp()
  })
}
