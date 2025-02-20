import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@/components/account/Transactions'))

const AccountPage = () => {
  return (
    <div>
      <Transactions />
    </div>
  )
}

export default withAuth(AccountPage)
