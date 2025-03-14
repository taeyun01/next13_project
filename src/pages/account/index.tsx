import Spacing from '@/components/shared/Spacing'
import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))
const PiggybankRow = dynamic(() => import('@/components/account/PiggybankRow'))
const CategoryPieChart = dynamic(
  () => import('@/components/account/CategoryPieChart'),
)
const Transactions = dynamic(() => import('@/components/account/Transactions'))

const AccountPage = () => {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <PiggybankRow />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <CategoryPieChart chartData={generatePieChartData()} />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Transactions />
    </div>
  )
}

const generatePieChartData = () => {
  return ['카페', '미용', '쇼핑', '교통', '기타'].map((label) => ({
    label,
    amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
  }))
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
