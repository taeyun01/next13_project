import { collection, getDocs } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'
import ListRow from '@/components/shared/ListRow'
import { useEffect, useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
}

// Client Side Rendering(CSR) 방식으로 데이터 렌더링
const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])

  useEffect(() => {
    getDocs(collection(store, COLLECTIONS.FAQ)).then((snapshot) => {
      const faqs = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as FAQ,
      )
      setFaqs(faqs)
    })
  }, [])

  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.ListRowTexts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

// Server Side Generation(SSG) 방식으로 데이터 렌더링
// const FAQPage = ({ faqs }: { faqs: FAQ[] }) => {
//   return (
//     <div>
//       {faqs.map((faq) => (
//         <ListRow
//           key={faq.id}
//           contents={
//             <ListRow.ListRowTexts title={faq.question} subTitle={faq.answer} />
//           }
//         />
//       ))}
//     </div>
//   )
// }

// export const getStaticProps = async () => {
//   const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))
//   const faqs = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }))

//   return {
//     props: {
//       faqs,
//     },
//   }
// }

export default FAQPage
