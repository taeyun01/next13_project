/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'
import { colors } from '../../styles/colorPalette'

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex as="ul" direction="column" gap={8} css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}

const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void
}) => {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)} gap={6}>
      <CheckIcon checked={checked} withCircle={true} />
      <Text bold>{children}</Text>
    </Flex>
  )
}

const AgreementDescription = ({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) => {
  return (
    <Flex as="li" justify="space-between">
      {/* 클릭 영역을 분리하기 위해 Flex로 감쌈 */}
      <Flex onClick={(e) => onChange(e, !checked)} gap={6}>
        <CheckIcon checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      )}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const CheckIcon = ({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={checked ? colors.blue : colors.gray}
    >
      <g data-name="Layer 28" id="Layer_28">
        {withCircle && (
          <path
            className="cls-1"
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
          />
        )}
        <path
          className="cls-1"
          d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
        />
      </g>
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 20px;

  & li {
    // 내부에 있는 li요소
    cursor: pointer;
  }
`

export default Agreement

/**
 *  <Agreement>
 *    <Agreement.Title>약관에 모두 동의</Agreement.Title>
 *    <Agreement.Description>약관1</Agreement.Description>
 *    <Agreement.Description>약관2</Agreement.Description>
 *  </Agreement>
 *  children 영역을 이용해서 텍스트를 표현
 *  children을 사용하게 되면 사용처에서 태그를 함께 섞어서 넣을 수도 있고 ex) <div>약관 모두 동의</div>
 *  텍스트만 넘길 수도 있음. ex) '약관 모두 동의'
 *  즉. 사용처에서 내부에 표현하는 걸 좀더 유연하게 만들어주고자 컴포넌트로 구성함
 */
