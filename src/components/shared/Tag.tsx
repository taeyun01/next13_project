import { colors, Colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface TagProps {
  color?: string
  backgroundColor?: string
}

// 태그 컴포넌트 (단일 사이즈)
const Tag = styled.span<TagProps>(
  ({ color = colors.white, backgroundColor = colors.blue }) => ({
    fontSize: '11px',
    padding: '4px 5px',
    fontWeight: 'bold',
    borderRadius: '2px',
    textAlign: 'center',
    color: color in colors ? colors[color as Colors] : color, // 넘겨받은 color가 colors팔레트에 정의된 값이면 colors팔레트에서 사용하도록 하고, 아니면 그냥 넘겨받은 컬러를 사용하게 만들어준다.
    backgroundColor:
      backgroundColor in colors
        ? colors[backgroundColor as Colors]
        : backgroundColor,
  }),
)

export default Tag
