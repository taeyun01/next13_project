import { CSSProperties } from 'react'
import { colors, Colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import { typographyMap, Typography } from '@/styles/typography'

interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color], // -> var(--red) 이거랑 같은 효과
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight, // bold 속성이 있으면 bold, 없으면 넘겨받은 fontWeight 사용
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
