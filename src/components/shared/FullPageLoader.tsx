import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

const FullPageLoader = ({
  message,
  backgroundColor,
  color,
  spacing = 30,
  imgSrc = 'https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif',
}: {
  message?: string
  backgroundColor?: string
  color?: string
  spacing?: number
  imgSrc?: string
}) => {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: backgroundColor || 'white',
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img width={120} src={imgSrc} alt="loading" />
        {message && (
          <>
            <Spacing size={spacing} />
            <Text bold typography="t4" style={{ color: color || 'black' }}>
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
