import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { createPortal } from 'react-dom'

import Button from './Button'
import { colors } from '../../styles/colorPalette'
import { ButtonColor } from '@/styles/button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  color?: ButtonColor
}

// portal에 버튼 띄우기
const FixedBottomButton = ({
  label,
  onClick,
  disabled,
  color = 'primary',
}: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('app-container')

  if (!$portalRoot) return null

  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        full
        onClick={onClick}
        css={buttonStyles}
        color={color}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideUp = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${colors.white};
  padding: 20px 10px 8px;

  box-sizing: border-box;

  width: 100%;
  max-width: 530px;

  margin: 0 auto;

  transform: translateY(100%);
  animation: ${slideUp} 0.5s ease-in-out forwards;

  z-index: 1001;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
