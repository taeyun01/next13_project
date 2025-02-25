import ListRow from '@/components/shared/ListRow'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const PiggybankRow = () => {
  const navigate = useRouter()
  return (
    <div>
      <ul>
        <ListRow
          style={piggybankRowStyles}
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
              title="저금통"
              subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요!"
            />
          }
          withArrow
          onClick={() => navigate.push('/account/piggybank/new')}
        />
      </ul>
    </div>
  )
}

const piggybankRowStyles = css`
  cursor: pointer;
`

export default PiggybankRow
