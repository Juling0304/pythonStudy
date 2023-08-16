import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as useFetch from '../../lib/useFetch'

function Header() {
    const [menu, setMenu] = useState([])

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

                if(refreshJson.status === 401){
                    router.push('/')
                }

                sessionStorage.setItem('access',refreshJson.access)
            }

        }
        fetchData()
      }, [])

    useEffect(() => {
        async function fetchData() {
            const headers = useFetch.forPostMethodWithJWT()

            const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/menu/', headers)
            const json = await res.json()
            setMenu(json)
        }
        fetchData()
      }, [])
    
    console.log(menu)

    if(menu.length === 0) {
        return (
            <div>
                <li>카테고리 1</li>
                <li>카테고리 2</li>
                <li>카테고리 3</li>
                <li>카테고리 4</li>
                <li>카테고리 5</li>
            </div>
        )
    } else {
        return (
            <div>
                {menu.map((item, index) => {
                    return (
                        <li>{item.title}</li>
                    )
                })}
            </div>
        )
    }

}

export default Header