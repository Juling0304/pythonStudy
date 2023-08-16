export function middleware(request) {
  // next에서는 middleware로 jwt 여부 확인 어려움
  // layout에서 useEffect로 하는것이 보통인듯 함
  // session, local storage는 window가 렌더링이 되어야 사용가능
  // 정 사용하고 싶으면 쿠키로 사용
  // const access = typeof window !== 'undefined' ? sessionStorage.getItem('access') : null;
  // console.log(access)
                    

}

export const config = {
  matcher: [
    '/main/:path*', 
    '/test/:path*',
  ],
}