// import { Link, useLocation } from 'react-router-dom'
// import Flex from './Flex'
// import Button from './Button'
// import { css } from '@emotion/react'
// import { colors } from '../../styles/colorPalette'
// import { useCallback } from 'react'
// import useUser from '@/hooks/auth/useUser'
// import Text from '@/components/shared/Text'

// const Navbar = () => {
//   const location = useLocation()
//   const showSigninButton = ['/signin', '/signup'].includes(location.pathname)

//   // 유저 정보 가져오기
//   const user = useUser()

//   // 유저 상태에 따라 버튼을 다르게 렌더링 해주는 함수
//   const renderButton = useCallback(() => {
//     // 로그인 상태일 경우 (user가 null이 아닐 경우, user정보가 있을 경우)
//     if (user) {
//       return (
//         <Flex align="center" gap={10}>
//           <Link to="/my">
//             <img
//               src={
//                 user.photoURL ??
//                 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png'
//               }
//               alt="유저의 이미지"
//               width={40}
//               height={40}
//               style={{ borderRadius: '100%' }}
//             />
//           </Link>
//           {/* <Link to="/settings">
//             <img
//               src="https://cdn1.iconfinder.com/data/icons/ionicons-outline-vol-2/512/settings-outline-64.png"
//               alt="설정 아이콘"
//               width={30}
//               height={30}
//             />
//           </Link> */}
//         </Flex>
//       )
//     }

//     // /signin', '/signup 경로가 아닐 경우. 로그인 버튼 렌더링
//     if (!showSigninButton) {
//       return (
//         <Link to="/signin">
//           <Button>로그인/회원가입</Button>
//         </Link>
//       )
//     }

//     return null
//   }, [user, showSigninButton])

//   return (
//     <Flex justify="space-between" align="center" css={navbarContainerStyles}>
//       <Link to="/">
//         <Flex align="center" gap={6}>
//           <img
//             src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_31-64.png"
//             alt="Booking 아이콘"
//             width={27}
//             height={27}
//           />
//           <Text typography="t6">여행의 시작</Text>
//         </Flex>
//       </Link>

//       {renderButton()}
//     </Flex>
//   )
// }

// const navbarContainerStyles = css`
//   padding: 0px 24px;

//   height: 64px;

//   position: sticky;
//   top: 0;
//   background-color: ${colors.white};
//   z-index: 10;
//   border-bottom: 1px solid ${colors.gray};
// `
// export default Navbar
