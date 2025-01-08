import { Colors, colors } from '@/styles/colorPalette'
import { SerializedStyles } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

const ScrollBar = ({
  style,
  color = 'blue980',
}: {
  style?: SerializedStyles
  color?: Colors
}) => {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const scroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      // scrollAnimation 즉 스크롤 이벤트 같은 경우에는 너무 빠른 시간에 많은 작업이 일어나기 때문에
      // 지금 ref에 값이 들어있다면 cancelAnimationFrame을 통해 중복된 작업이 반복적으로 일어나지 않도록 해줌
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        setProgress(scrollTop / height)
      })
    }

    window.addEventListener('scroll', scroll)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <div
      css={style}
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left', // 왼쪽부터 애니메이션 시작
        backgroundColor: `${colors[color]}`, // props로 받은 color 사용(기본값은 blue980)
        height: 10,
      }}
    ></div>
  )
}

export default ScrollBar
