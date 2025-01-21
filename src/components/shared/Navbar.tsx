import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  // 라우터의 패스네임이 로그인 페이지가 아닐때만 버튼 렌더링 (로그인 페이지면 버튼 제거)
  const showSignButton = ['/auth/signin'].includes(router.pathname) === false

  const renderButton = useCallback(() => {
    if (session) {
      return (
        <Link href="/my">
          <Image
            src={
              session.user?.image ??
              'src="https://cdn4.iconfinder.com/data/icons/music-ui-solid-24px/24/user_account_profile-2-512.png"'
            } // 이미지가 없을땐 fallback 이미지 넣기
            width={40}
            height={40}
            alt="user-image"
          />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link href="/auth/signin">
          <Button color="basic">로그인/회원가입</Button>
        </Link>
      )
    }

    return null // 둘다 아닐때 null 반환
  }, [session, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/social-media-with-fill/64/twitter_colour-64.png"
          alt="logo"
          width={35}
          height={35}
        />
      </Link>
      {renderButton()}
    </Flex>
  )
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray100};
  height: 33.5px;
`

export default Navbar
