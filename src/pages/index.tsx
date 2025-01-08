import Head from 'next/head'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import styles from './index.module.css'

export default function Home() {
  return (
    <ContainerStyled>
      <div css={bold}>Hello World</div>
      <h2 className={styles.title}>css module 사용</h2>
    </ContainerStyled>
  )
}

const ContainerStyled = styled.div`
  background-color: red;
  padding: 10px;
`

const bold = css`
  font-weight: bold;
`
