import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// 프리패치를 하기 위해선 빌드를 해서 확인
const Link1 = () => {
  const router = useRouter()

  // 웬만하면 Link컴포넌트를 사용하고, 어떤 특정 액션을 한 후에 페이지 이동을 해야한다면 이런식으로 사용
  const moveTo10Page = () => {
    router.push('/link/10')
  }

  // 라우터를 이용하여 프리패치를 하고 싶을 때
  useEffect(() => {
    router.prefetch('/link/10')
  }, [router])

  return (
    <div>
      Link1 Page
      <Spacing size={1000} />
      {/* <Link href="/link/2">Link2로 이동</Link> */}
      <div onClick={moveTo10Page}>Link10로 이동</div>
    </div>
  )
}

export default Link1
