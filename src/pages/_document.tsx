import { Html, Head, Main, NextScript } from 'next/document'

// _document.tsx는 서버사이드에서만 렌더링됨
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
