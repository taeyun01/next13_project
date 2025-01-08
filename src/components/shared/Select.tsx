import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'
// import { Option } from '../../models/apply'

export interface Option {
  label: string
  value: string | number | undefined
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

const BaseSelect = styled.select`
  height: 52px;
  border-radius: 10px;
  border: 1px solid ${colors.gray};
  padding: 0 16px;
  cursor: pointer;
  appearance: none; // select 기본 스타일 화살표 제거

  // 필수 값을 만족하지 않으면 폰트 색상 변경
  &:required:invalid {
    color: #c0c4c7;
  }
`

//forwardRef의 첫번째 타입은 어떤 ref를 받을지, 두번째는 어떤 props를 받을지에 대한 타입
// 사용처에서 <Select placeholder="아직 선택되지 않음" /> 이런 식으로 넣어 줄수 있는데 이 값이 <option>{placeholder}</option>에 표시됨. 대신 얘는 보여주는 용도라서 option이 선택되면 안되서 보여주는 용도로 처리
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectComponent(
    { label, options, placeholder, value, ...props },
    ref,
  ) {
    //* 지금 설정한 props들 말고 select가 가지고 있는 여러가지 속성들이 넘어올 수 있으므로 ...props로 넘겨준다
    return (
      <Flex direction="column">
        {label ? (
          <Text
            typography="t6"
            color="black"
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <BaseSelect required={true} ref={ref} value={value} {...props}>
          <option disabled hidden value="">
            {placeholder}
          </option>
          {/** 실제 선택지로 사용될 옵션들 */}
          {options.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </BaseSelect>
      </Flex>
    )
  },
)

export default Select
