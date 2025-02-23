import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))
const Transactions = dynamic(() => import('@/components/account/Transactions'))

const AccountPage = () => {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

// 월별 더미데이터 생성
const generateMonthlyChartData = () => {
  return [
    '2024-01-31',
    '2024-02-28',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date) => {
    return {
      date,
      balance: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000, // 10,000 ~ 100,000 사이의 랜덤 값
    }
  })
}

export default withAuth(AccountPage)
