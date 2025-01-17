import withAuth from '@/components/shared/hocs/withAuth'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const MyPage = () => {
  const { data: session } = useSession()

  // TODO: 유저 임시 처리
  return (
    <div>
      <h3>{session?.user?.name}</h3>
      <h3>{session?.user?.email}</h3>
      <Image
        src={session?.user?.image ?? ''}
        alt="user-image"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  )
}

export default withAuth(MyPage)
