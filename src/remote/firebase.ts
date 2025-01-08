import { initializeApp, getApp, getApps } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
// 초기화가 중복되서 진행되지 않도록 설정. getApps()를 이용해 이미 초기화된 앱이 있는지 확인
// 이미 초기화가 되어있으면 다시 초기화할 필요가 없으니까 이미 초기화 되어있는 getApp()을 사용하도록 반환하고
// 초기화가 안되어있으면 initializeApp()을 사용해서 초기화 하도록 함
const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
      })

export const auth = getAuth(app)
export const store = getFirestore(app)
