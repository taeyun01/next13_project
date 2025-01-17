import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hocs/withAuth'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const MyPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      <Top title="내 프로필" subtitle="내 프로필 관리" />
      <Flex direction="column" align="center" gap={8}>
        <Image
          src={session?.user?.image ?? ''}
          alt="user-image"
          width={80}
          height={80}
          style={{ borderRadius: '50%' }}
        />
        <Flex direction="column" align="center" gap={4}>
          <Text bold typography="t4">
            {session?.user?.name}
          </Text>
          <Text bold>{session?.user?.email}</Text>
        </Flex>
      </Flex>

      <FixedBottomButton
        color="error"
        onClick={() => signOut({ callbackUrl: '/' })}
        label="로그아웃"
      />
    </div>
  )
}

export default withAuth(MyPage)
