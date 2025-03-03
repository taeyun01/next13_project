import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { NextPageContext } from 'next'
import Image from 'next/image'

//* 공식문서 : https://nextjs-ko.org/docs/pages/building-your-application/routing/custom-error
// 공통에러 처리
const Error = ({ statusCode }: { statusCode?: number }) => {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png"
          alt="error"
          width={120}
          height={120}
        />
        <Spacing size={20} />
        <Text>{statusCode} 에러가 발생했습니다.</Text>
        <Spacing size={20} />
        <Button onClick={() => window.history.back()} color="error">
          돌아가기
        </Button>
      </Flex>
    </div>
    // <p>
    //   {statusCode
    //     ? `An error ${statusCode} occurred on server` //statusCode가 있으면 서버측 에러로 판단
    //     : 'An error occurred on client'}
    // </p>
  )
}

// getInitialProps는 서버와 클라이언트 두번 실행되는 곳
Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
