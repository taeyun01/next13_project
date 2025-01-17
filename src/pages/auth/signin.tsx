import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { BuiltInProviderType } from 'next-auth/providers/index'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'

const SigninPage = ({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) => {
  // console.log('클라이언트 providers', providers)

  return (
    <div>
      <Flex
        style={{ marginTop: 100 }}
        direction="column"
        align="center"
        gap={80}
      >
        <Text bold>로그인 하시겠습니까?</Text>
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                color="basic"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: '/', // 로그인 후 이동할 페이지
                  })
                }
              >
                {provider.name}로 로그인
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  // console.log('서버 providers', providers)

  return {
    props: {
      providers,
    },
  }
}

export default SigninPage
