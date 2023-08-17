import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as useFetch from '../../lib/useFetch'

function BoardsIndex() {
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(0)
    const [list, setList] = useState([])

    useEffect(() => {
        async function fetchData() {
            const headers = useFetch.forGetMethodWithJWT()

            const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/boards/list_post/?page=' + page, headers)

            if(res.status === 200){
                const json = await res.json()

                setTotal(json.info_page.total_items)
                setLimit(json.info_page.items_per_page)
                setList(json.list)
            }
        }
        fetchData()
    }, [])
    console.log(list)
    return (
        <Layout>
            <div className="flex items-center justify-center bg-green-100 min-h-screen ">
                <span className='text-5xl font-bold'>게시판 인덱스</span>
                <Link href="/boards/post" className="py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">글쓰기 임시</Link>
            </div>
        </Layout>
    )
}

export default BoardsIndex