import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { colors } from '@/styles/colorPalette'

const opacity = keyframes`
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
`

const Skeleton = styled.div<{
  width: string | number
  height: string | number
}>(({ width, height }) => ({
  backgroundColor: colors.gray300,
  animation: `${opacity} 1.5s ease-in-out infinite`,
  width: `${width}px`,
  height: `${height}px`,
}))

export default Skeleton
