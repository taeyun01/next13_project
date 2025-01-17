import Layout from '@/components/shared/Layout'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'

import type { AppProps } from 'next/app'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@/components/auth/AuthGuard'

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  // console.log('_app')

  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
