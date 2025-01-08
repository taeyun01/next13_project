import { css, SerializedStyles } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'
import Skeleton from './Skeleton'
import Spacing from './Spacing'
import { Colors } from '@/styles/colorPalette'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean // 화살표 표시 여부 (true면 화살표 표시)
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles // 커스텀 스타일 array로 넘겨주면 스타일을 확장해서 사용가능
}

//* 컴포넌트 합성하기 : 방대한 양의 props를 사용하지 않아도 되고 재사용성에도 좋음 (props 드릴링 해결)
const ListRow = ({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
}: ListRowProps) => {
  return (
    //* ListRow는 UI를 넣을 구멍만 뚫어주고 사용처에서 각각 요소들을 조합해서 사용하는 방법
    <Flex
      as={as}
      css={[listRowContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listRowLeftStyles}>{left}</Flex>}{' '}
      {/* left를 넣었을때만 그려주기 */}
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow && <ArrowRightIcon />}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`

//* 합성할 컴포넌트
const ListRowTexts = ({
  title,
  subTitle,
  isTitleBold = true,
  isSubTitleBold = false,
  titleFontSize = 't5',
  subTitleFontSize = 't7',
  subTitleColor = 'black',
  spacing = 0,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
  isTitleBold?: boolean
  isSubTitleBold?: boolean
  titleFontSize?: 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7'
  subTitleFontSize?: 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7'
  subTitleColor?: Colors
  spacing?: number
}) => {
  return (
    <Flex direction="column">
      <Text bold={isTitleBold} typography={titleFontSize}>
        {title}
      </Text>
      <Spacing size={spacing} />
      <Text
        bold={isSubTitleBold}
        typography={subTitleFontSize}
        color={subTitleColor}
      >
        {subTitle}
      </Text>
    </Flex>
  )
}

const SkeletonListRow = () => {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.ListRowTexts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={8} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <ArrowRightIcon />
    </Flex>
  )
}

const ArrowRightIcon = () => {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

//* 컴포넌트 합성
// ListRow에 ListRowTexts를 사용하겠다. 라는 의미
// 함수도 객체니까 이런식으로 key와 value를 이용해서 컴포넌트를 넣어줄 수 있음
ListRow.ListRowTexts = ListRowTexts
ListRow.Skeleton = SkeletonListRow

export default ListRow
