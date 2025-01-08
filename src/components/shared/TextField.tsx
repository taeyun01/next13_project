import React, {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react'
import Text from './Text'
import Input from './Input'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

// forwardRef를 사용하여 ref를 전달받을 수 있는 TextField 컴포넌트 정의
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props }, // 컴포넌트의 props 정의 (label, hasError, helpMessage, onFocus, onBlur 등)
    ref,
  ) {
    // focused 상태를 관리하기 위한 state 선언
    const [focused, setFocused] = useState(false)

    // 라벨 색상을 결정하는 로직 (에러가 있으면 빨간색, 에러가 없고 그냥 focus만 되면 파란색)
    // 에러 색상을 최우선순위로 설정 에러가 났을때 포커스가 되도 빨간색으로 표시
    const labelColor = hasError ? 'red' : focused ? 'blue' : undefined

    // focus 이벤트 핸들러 - focused 상태를 true로 설정하고 onFocus 콜백 실행
    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true)
      onFocus?.(event)
    }

    // blur 이벤트 핸들러 - focused 상태를 false로 설정하고 onBlur 콜백 실행
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div>
        {/* label prop이 있을 경우 Text 컴포넌트로 라벨 렌더링 */}
        {label ? (
          <Text
            typography="t6"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}

        {/* Input 컴포넌트 렌더링 */}
        <Input
          ref={ref}
          aria-invalid={hasError} // aria-invalid 속성 추가
          onFocus={handleFocus} // 라벨, 인풋, 헬프메시지 전체를 focus주기
          onBlur={handleBlur} // blur 이벤트 핸들러 추가
          {...props}
        />

        {/* helpMessage prop이 있을 경우 Text 컴포넌트로 도움말 메시지 렌더링 */}
        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }} // 동적인 요소들에 마진 같은걸 주는게 좋음
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
