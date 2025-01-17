import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

// 인증이 필요한 페이지에 진입하는데 지금 세션이 비어있다면 로그인 페이지로 이동을 시키는 hoc컴포넌트
function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const router = useRouter()
    const { data: session, status } = useSession()

    // status가 로딩 상태가 아니고, 로딩이 끝난 상태인데 세션이 없다면 로그인 페이지로 이동
    if (status !== 'loading' && !session) {
      router.replace('/auth/signin')

      return null // 아무것도 그리지 않도록
    }

    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
