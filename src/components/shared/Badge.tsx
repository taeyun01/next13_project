import styled from '@emotion/styled'
import { colors } from '../../styles/colorPalette'
import Text from './Text'

interface BadgeProps {
  label: string
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <Container>
      <Text bold typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  padding: 2px 8px;
  border-radius: 12px;
  background-color: ${colors.blue};
`

export default Badge
