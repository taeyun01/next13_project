import Input from '@/components/shared/Input'
import Top from '@/components/shared/Top'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getSearchCards } from '@/remote/card'

import { useQuery } from '@tanstack/react-query'
import Text from '@/components/shared/Text'
import ListRow from '@/components/shared/ListRow'
import Badge from '@/components/shared/Badge'
import styled from '@emotion/styled'
import Spacing from '@/components/shared/Spacing'
import { css } from '@emotion/react'
import useDebounce from '@/hooks/useDebounce'

const SearchPage = () => {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)
  // console.log('debouncedKeyword', debouncedKeyword)

  const navigate = useRouter()

  const location = navigate.pathname
  const isSearchPage = ['/card/search'].includes(location) === true

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({
    queryKey: ['search', debouncedKeyword],
    queryFn: () => getSearchCards(debouncedKeyword),
    enabled: debouncedKeyword !== '', // 검색을 입력했을 때만 쿼리 실행
  })

  // console.log(data)

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus()
  //   }
  // }, [])

  useEffect(() => {
    const currentInputRef = inputRef.current

    if (currentInputRef) {
      currentInputRef.focus()
    }

    const handleBlur = () => {
      if (isSearchPage) {
        window.history.back()
      }
    }

    currentInputRef?.addEventListener('blur', handleBlur)

    return () => {
      currentInputRef?.removeEventListener('blur', handleBlur)
    }
  }, [isSearchPage])

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
              <Fragment key={card.id}>
                <ListRow
                  style={searchBox}
                  left={
                    <Text bold typography="t6">
                      {idx + 1}
                    </Text>
                  }
                  contents={
                    <ListRow.ListRowTexts title={card.name} subTitle="" />
                  }
                  right={card.payback && <Badge label={card.payback} />}
                  withArrow
                  onClick={() => navigate.push(`/card/${card.id}`)}
                />
                <Spacing size={1} backgroundColor="gray100" />
              </Fragment>
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

const searchBox = css`
  padding: 22px 12px;
  cursor: pointer;
`

export default SearchPage
