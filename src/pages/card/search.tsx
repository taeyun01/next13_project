import Input from '@/components/shared/Input'
import Top from '@/components/shared/Top'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { getSearchCards } from '@/remote/card'

import { useQuery } from '@tanstack/react-query'
import Text from '@/components/shared/Text'
import ListRow from '@/components/shared/ListRow'
import Badge from '@/components/shared/Badge'
import styled from '@emotion/styled'

const SearchPage = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({
    queryKey: ['search', keyword],
    queryFn: () => getSearchCards(keyword),
    enabled: keyword !== '', // 검색을 입력했을 때만 쿼리 실행
  })

  console.log(data)

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div>
      <Top title="추천카드" subtitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          ref={inputRef}
          value={keyword}
          placeholder="찾으시는 카드가 있으신가요?"
          onChange={handleKeyword}
        />

        {keyword !== '' && data?.length === 0 ? (
          <SearchEmptyStyled>
            <Text bold typography="t6">
              찾으시는 카드가 없습니다
            </Text>
          </SearchEmptyStyled>
        ) : (
          <ul>
            {data?.map((card, idx) => (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.ListRowTexts
                    title={`${idx + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback && <Badge label={card.payback} />}
                withArrow
                onClick={() => navigate.push(`/card/${card.id}`)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const SearchEmptyStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
`

export default SearchPage
