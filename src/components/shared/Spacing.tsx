import { Colors, colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'vertical' | 'horizontal'
  backgroundColor?: Colors // 배경색 확장
}

// <Spacing size={16} /> 아무런 옵션도 주지 않으면 세로 여백 16px

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
      height: ${size}px;
    `
      : `
    width: ${size}px;
    `}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${colors[backgroundColor]};`}
`

export default Spacing
