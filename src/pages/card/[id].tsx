import { GetServerSidePropsContext } from 'next'
import { getCard } from '@/remote/card'
import { Card } from '@/types/card'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { motion } from 'framer-motion'
import Top from '@/components/shared/Top'
import ListRow from '@/components/shared/ListRow'
import Image from 'next/image'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import dynamic from 'next/dynamic'
import SEO from '@/components/shared/SEO'

// fixed버튼은 window에 접근해서 포탈을 띄우는 건데, 서버사이드 렌더링에서 window에 접근을 할 수 없음. 이때 해결방법
// 버튼을 dynamic하게 불러와서 ssr을 false로 설정하고 서버사이드 렌더링에서는 버튼의 존재를 모르도록 해서 그리지 않도록함
const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

interface CardDetailPageProps {
  initialCard: Card
}

const CardDetailPage = ({ initialCard }: CardDetailPageProps) => {
  // 서버 query id를 뽑아옴
  const { id } = useParams()

  // 서버에서 데이터를 불러와 초기 데이터를 미리 준비했지만, 이 데이터가 온전하게 내려오지 않을 수도 있다. 그럴 때는 클라이언트에서 다시 한번 채워줘야한다.
  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id as string),
    initialData: initialCard, // 최초의 값이 온전하게 넘어오면 호출하지 않음
  })

  console.log(data)

  if (!data) return

  const { name, corpName, tags, promotion, payback, benefit } = data
  const subTitle = promotion ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://sojoong.joins.com/wp-content/uploads/sites/4/2024/12/01.jpg"
      />
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />
      <ul>
        {benefit.map((text, idx) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{ duration: 0.4, delay: idx * 0.4, ease: 'easeInOut' }}
            animate={{ opacity: 1, translateX: 0 }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-64.png"
                  alt="check icon"
                  width={30}
                  height={30}
                />
              }
              contents={
                <ListRow.ListRowTexts
                  title={`혜택 ${idx + 1}`}
                  subTitle={text}
                />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion && (
        <Flex
          direction="column"
          gap={10}
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      )}

      <FixedBottomButton
        color="basic"
        label="1분만에 신청하고 혜택받기"
        onClick={() => {}}
      />
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}

const removeHtmlTags = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

export default CardDetailPage
