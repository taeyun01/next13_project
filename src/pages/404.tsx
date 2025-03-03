import Image from 'next/image'

import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'

//* Custom Error 공식문서 : https://nextjs-ko.org/docs/pages/building-your-application/routing/custom-error
const NotFoundPage = () => {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-512.png"
          alt="404"
          width={120}
          height={120}
        />
        <Spacing size={20} />
        <Text>찾으시는 페이지가 없습니다.</Text>
        <Spacing size={40} />
        <Button onClick={() => window.history.back()} color="basic">
          돌아가기
        </Button>
      </Flex>
    </div>
  )
}

export default NotFoundPage
