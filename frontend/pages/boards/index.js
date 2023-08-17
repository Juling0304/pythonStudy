import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as useFetch from '../../lib/useFetch'
import moment from 'moment/min/moment-with-locales'
moment.locale('ko')

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
    }, [page])

    const setOnClick = (event) => {
        const {
          currentTarget: { value, id },
        } = event
    
        if(id === 'prev'){
            if(page !== 1){
                setPage(page - 1)
            }
        } else if(id === 'next'){
            // total 값 확인
            if(page !== total){
                setPage(page + 1)
            }
        } else {
            setPage(value)
        }

    }
    
    console.log(list)
    return (
        <Layout>
            <div className="flex items-center justify-center">
                <Link href="/boards/post" className="py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">글쓰기 임시</Link>
            </div>
            <div className="flex items-center justify-center bg-white border-t-4 border-green-600">
                <table className="border border-2 w-5/6 mt-10">
                    <thead>
                        <tr>
                            <th className='w-[20%]'>No.</th>
                            <th className='w-[40%]'>제목</th>
                            <th className='w-[20%]'>글쓴이</th>
                            <th className='w-[20%]'>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td className='text-center'>{total - (limit * (page - 1)) - index}</td>
                                    <td className='text-center'>{item.subject}</td>
                                    <td className='text-center'>{item.author}</td>
                                    <td className='text-center'>{moment(item.create_date).format("YYYY년 MM월 DD일 hh:mm a")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            <div className='flex items-center justify-center'>
                <button onClick={setOnClick} id="prev" className='mx-2'>{'<'}</button>
                <button onClick={setOnClick} className='mx-2' value="1">1</button>
                <button onClick={setOnClick} className='mx-2' value="2">2</button>
                <button onClick={setOnClick} className='mx-2' value="3">3</button>
                <button onClick={setOnClick} className='mx-2' value="4">4</button>
                <button onClick={setOnClick} id="next" className='mx-2'>{'>'}</button>
                {
                    for( let i = 1; i < Math.ceil(total / limit); i++){

                    }
                }
            </div>

        </Layout>
    )
}

export default BoardsIndex