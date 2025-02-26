import { Piggybank } from '@/types/piggybank'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

export const createPiggybank = (newPiggybank: Piggybank) => {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}
