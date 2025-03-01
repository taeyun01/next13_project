import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Link3 = () => {
  const router = useRouter()

  const moveTo1Page = () => {
    router.push('/link/1')
  }

  useEffect(() => {
    router.prefetch('/link/1')
  }, [router])

  return (
    <div>
      Link3 Page
      <Spacing size={1000} />
      <Link href="/link/1">Link1로 이동</Link>
      <Spacing size={20} />
      <div onClick={moveTo1Page}>Link1로 이동</div>
    </div>
  )
}

export default Link3
