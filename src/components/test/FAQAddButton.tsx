import Button from '@/components/shared/Button'

import { collection, doc, writeBatch } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

const FAQS = [
  {
    question: '자산관리는 어떤 서비스인가요?? 1',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 1',
  },
  {
    question: '자산관리는 어떤 서비스인가요?? 2',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 2',
  },
  {
    question: '자산관리는 어떤 서비스인가요?? 3',
    answer: '유저에게 편리한 경험을 제공해주는 자산 서비스 입니다. 3',
  },
]

const FAQAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    const faqRef = collection(store, COLLECTIONS.FAQ)

    FAQS.forEach((faq) => {
      const faqDocRef = doc(faqRef)

      batch.set(faqDocRef, faq)
    })

    await batch.commit().then(() => {
      alert('FAQ 데이터 추가 완료')
    })
  }
  return <Button onClick={handleButtonClick}>FAQ 데이터 추가하기</Button>
}

export default FAQAddButton
