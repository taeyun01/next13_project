import Spacing from '@/components/shared/Spacing'
import Link from 'next/link'

const Link3 = () => {
  return (
    <div>
      Link3 Page
      <Spacing size={1000} />
      <Link href="/link/1">Link1로 이동</Link>
    </div>
  )
}

export default Link3
