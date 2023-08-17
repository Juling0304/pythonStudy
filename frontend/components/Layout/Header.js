import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as useFetch from '../../lib/useFetch'
import Link from 'next/link'

function Header() {
    const [menu, setMenu] = useState([])
    const [name, setName] = useState('')

    const router = useRouter()

    // jwt 인증 및 갱신
    useEffect(() => {
        async function fetchData() {
            const forAccess = useFetch.forJWT('verify')

            const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/jwt-token-auth/verify/', forAccess)

            if(res.status === 401){
                console.log('need refresh')
                const forRefresh = useFetch.forJWT('refresh')

                const refreshRes =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/jwt-token-auth/refresh/', forRefresh)
                const refreshJson = await refreshRes.json()

                if(refreshRes.status === 401){
                    router.push('/')
                }
                router.reload()
                sessionStorage.setItem('access',refreshJson.access)


            }

            // 따로 빼도 되지만 어차피 인증 못하면 필요 없음
            setName(sessionStorage.getItem('name'))
        }
        fetchData()
    }, [])

    // 메뉴 가져오기
    useEffect(() => {
        async function fetchData() {
            const headers = useFetch.forPostMethodWithJWT()

            const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/menu/', headers)
            const json = await res.json()
            if(res.status !== 401){
                setMenu(json)
            }
        }
        fetchData()
    }, [])

    const logout = () => {
        sessionStorage.setItem('access', '')
        sessionStorage.setItem('refresh', '')
        sessionStorage.setItem('id', '')
        sessionStorage.setItem('name', '')
        router.push('/')
    }

    return (
        <nav className="bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div>
                            <Link href="/main" className="flex items-center py-5 px-2 text-gray-700">
                                <span className="font-bold">Home</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-1">
                            {menu.map((item, index) => {
                                return (
                                    <Link href={item.route} key={item.title} className="py-5 px-3 text-gray-700 hover:text-gray-900" >{item.title}</Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        <button onClick={logout} className="py-5 px-3">
                            Log out
                        </button>
                        <span className="py-2 px-3 bg-green-200 hover:bg-green-400 text-black-900 hover:text-black-800 rounded transition duration-300">
                            {name}
                        </span>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
    
}

export default Header