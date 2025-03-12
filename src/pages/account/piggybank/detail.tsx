import Top from '@/components/shared/Top'
import { getPiggybankList } from '@/remote/piggybank'
import useUser from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'
import ListRow from '@/components/shared/ListRow'
import Image from 'next/image'
import { differenceInDays } from 'date-fns'
import Button from '@/components/shared/Button'
import { useRouter } from 'next/router'

const PiggybankDetail = () => {
  const user = useUser()
  const navigate = useRouter()

  const { data: piggybankList } = useQuery({
    queryKey: ['piggybankList', user?.id],
    queryFn: () => getPiggybankList(user?.id as string),
    suspense: true,
    enabled: !!user?.id, // 유저가 있을때만 쿼리 실행
  })

  if (!piggybankList) {
    return <div>통장이 없습니다.</div>
  }

  // 목표 날짜가 진행중인 통장 필터
  const currentPiggybank = piggybankList.filter((piggybank) => {
    const endDate = new Date(piggybank.endDate)
    return endDate > new Date()
  })

  // 목표 날짜가 끝난 통장 필터
  const endedPiggybankList = piggybankList.filter((piggybank) => {
    const endDate = new Date(piggybank.endDate)
    return endDate < new Date()
  })

  return (
    <div>
      <Top title="진행중인 통장" subtitle="" />
      <ul>
        {currentPiggybank.length === 0 ? (
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-1024.png"
                alt="piggybank"
                width={40}
                height={40}
              />
            }
            contents={
              <ListRow.ListRowTexts
                title="진행중인 통장이 없습니다."
                subTitle=""
              />
            }
          />
        ) : (
          currentPiggybank.map((piggybank) => (
            <ListRow
              key={piggybank.id}
              left={
                <Image
                  src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-1024.png"
                  alt="piggybank"
                  width={40}
                  height={40}
                />
              }
              contents={
                <ListRow.ListRowTexts
                  title={piggybank.name}
                  subTitle={`D-${differenceInDays(piggybank.endDate, new Date())}`}
                />
              }
              right={
                <Button
                  color="basic"
                  onClick={() => {
                    // TODO: 저금하기 페이지로 이동
                    navigate.push(`/account/piggybank/saving/${piggybank.id}`)
                  }}
                >
                  저금하기
                </Button>
              }
            />
          ))
        )}
      </ul>

      <Top title="종료된 통장" subtitle="" />
      <ul>
        {endedPiggybankList.map((piggybank) => (
          <ListRow
            key={piggybank.id}
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-1024.png"
                alt="piggybank"
                width={40}
                height={40}
              />
            }
            contents={
              <ListRow.ListRowTexts
                title={piggybank.name}
                subTitle={`${new Date(piggybank.startDate).toLocaleDateString()} ~ ${new Date(piggybank.endDate).toLocaleDateString()}`}
              />
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default PiggybankDetail
