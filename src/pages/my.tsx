import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import withAuth from '@/hooks/withAuth'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Spacing from '@/components/shared/Spacing'
import ListRow from '@/components/shared/ListRow'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'

const MyPage = () => {
  const { data: session } = useSession()

  const navigate = useRouter()

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
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <ul>
        <ListRow
          style={termsRowStyles}
          contents={
            <ListRow.ListRowTexts title="약관" subTitle="약관목록 및 철회" />
          }
          withArrow
          onClick={() => {
            //TODO : 약관 페이지 이동
            navigate.push('/settings/terms')
          }}
        />
      </ul>

      <FixedBottomButton
        color="error"
        onClick={() => signOut({ callbackUrl: '/' })}
        label="로그아웃"
      />
    </div>
  )
}

const termsRowStyles = css`
  cursor: pointer;
`

export default withAuth(MyPage)
