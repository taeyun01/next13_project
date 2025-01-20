import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { Event } from '@/types/event'
import { collection, doc, getDoc } from 'firebase/firestore'

export const getEvent = async (id: string) => {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.EVENT), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Event),
  }
}
