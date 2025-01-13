import Input from '@/components/shared/Input'
import Top from '@/components/shared/Top'
import { useRouter } from 'next/router'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

const SearchPage = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  console.log(keyword)

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
      </div>
    </div>
  )
}

export default SearchPage
