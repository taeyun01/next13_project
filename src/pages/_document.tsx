import { Html, Head, Main, NextScript } from 'next/document'

// _document.tsx는 서버사이드에서만 렌더링됨 (정적인 요소들 추가)
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
