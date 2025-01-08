import styled from '@emotion/styled'
import { colors } from '../../styles/colorPalette'

// 기본적으로 프로그래스바가 갖는 스타일을 정해줌
const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`, // 프로그래스바의 크기를 조절 (진행 상태를 표현)
  transition: 'transform 0.3s ease-in-out',
  transformOrigin: 'left',
}))

const Container = styled.div({
  width: '100%',
  height: 10,
  overflow: 'hidden', // 프로그래스바 넘치는 부분을 숨김
  backgroundColor: colors.gray,
  borderRadius: 6,
})

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Container>
      <BaseProgressBar progress={progress} />
    </Container>
  )
}

export default ProgressBar
