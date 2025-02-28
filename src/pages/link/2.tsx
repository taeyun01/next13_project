import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'

const Link2 = () => {
  return (
    <div>
      Link2 Page
      <Spacing size={1000} />
      <Link href="/link/3">Link3로 이동</Link>
      {/* 프리패치를 false로 하면 링크에 hover하는 순간 프리패치가 된다. */}
      <Link href="/link/3" prefetch={false}>
        Link3로 이동
      </Link>
    </div>
  )
}

export default Link2
