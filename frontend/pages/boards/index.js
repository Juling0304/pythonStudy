import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as useFetch from '../../lib/useFetch'
import Pagination from '../../components/Pagination'
import moment from 'moment/min/moment-with-locales'
moment.locale('ko')

function BoardsIndex() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(0)
    const [list, setList] = useState([])

    useEffect(() => {
        async function fetchData() {
            const headers = useFetch.forGetMethodWithJWT()

            const res =  await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/list_post/?page=' + page, headers)

            if(res.status === 401){
                alert('로그인 유지 시간이 초과되었습니다.')
                router.reload()
            } else if(res.status === 200) {
                const json = await res.json()

                setTotal(json.info_page.total_items)
                setLimit(json.info_page.items_per_page)
                setList(json.list)
            }

        }
        fetchData()
    }, [page, router])
    
    return (
        <Layout>
            <div className="flex items-center justify-center bg-white border-t-4 border-green-500">
                <div className="table border-collapse border border-green-400 w-5/6 mt-10 shadow-md">
                    <table className='w-full'>
                        <thead className='bg-green-50'>
                            <tr>
                                <th className='w-[20%]'>No.</th>
                                <th className='w-[30%]'>제목</th>
                                <th className='w-[20%]'>글쓴이</th>
                                <th className='w-[20%]'>작성일</th>
                                <th className='w-[10%]'>추천수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {
                                return (
                                    <tr className='border-t-2 border-gray-100 hover:bg-green-100' key={item.id}>
                                        <td className='text-center'>{total - (limit * (page - 1)) - index}</td>
                                        <td className='text-center'>
                                            <Link href={"/boards/post/" + item.id}>
                                                {item.subject}
                                            </Link>
                                        </td>
                                        <td className='text-center'>{item.author}</td>
                                        <td className='text-center'>{moment(item.create_date).format("YYYY년 MM월 DD일 hh:mm a")}</td>
                                        <td className='text-center text-red-400'>{item.voter.length}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination page={page} total={total} limit={limit} setPage={setPage}/>
            <div className="flex items-center justify-center">
                <div className="w-5/6">
                    <Link href="/boards/post" className="py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">글쓰기</Link>
                </div>
            </div>
        </Layout>
    )
}

export default BoardsIndex