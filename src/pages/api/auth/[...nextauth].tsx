import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { User } from '@/types/user'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, // undefined 일 수 있다고 하니까 분명히 값이 있다고 알려주고 string으로 지정함
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      // console.log('session', session)
      // console.log('token', token)
      if (session.user) {
        ;(session.user as User).id = token.sub as string
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
})
