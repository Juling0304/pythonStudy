import { useEffect, useState } from 'react'
import * as useFetch from '../../lib/useFetch'

function Header() {
    const [menu, setMenu] = useState()

    useEffect(() => {
        async function fetchData() {
            const headers = useFetch.forPostMethodWithJWT()

            const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/menu/', headers)
            const json = await res.json()
            if(res.status == 401){
                
            }
            console.log(json)
        }
        fetchData()
      }, [])

    return (
        <div>
            <li>카테고리 1</li>
            <li>카테고리 2</li>
            <li>카테고리 3</li>
            <li>카테고리 4</li>
            <li>카테고리 5</li>
        </div>
    )
}

export default Header