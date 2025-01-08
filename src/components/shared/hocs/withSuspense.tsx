import { Suspense, ComponentType, ReactNode } from 'react'

//* high order component는 앞에 with이라는 프리픽스가 붙음
// withSuspense(<앱컴포넌트 />, {fallback: <로딩컴포넌트 />}) // 앱컴포넌트는 이제 데이터를 부를 때 로딩에 대한 처리를 신경쓰지 않아도됨
function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return function SuspendedComponent(props: Props) {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}

export default withSuspense

//* high order component가 해주는 역할은
//* 해당 컴포넌트들을 Suspense로 감싸고 fallback을 받아서 로딩에 대한 처리를 선언적으로 할 수 있게 도와줌
