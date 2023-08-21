import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout/Layout'
import * as useFetch from '../../../lib/useFetch'
import moment from 'moment/min/moment-with-locales'
moment.locale('ko')

function PostDetail(){
    const router = useRouter()
    const [data, setData] = useState([])
    const [modify, setModify] = useState(false)
    const [replys, setReplys] = useState([])
    const [reply, setReply] = useState('')

    useEffect(() => {
        async function fetchData() {
            if (router.query.id !== undefined) {
                const headers = useFetch.forGetMethodWithJWT()
                const res =  await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/post/?id=' + router.query.id, headers)
    
                if(res.status === 401){
                    alert('로그인 유지 시간이 초과되었습니다.')
                    router.reload()
                } else if(res.status === 200) {
                    const json = await res.json()
                    console.log(json.data)
                    if(json.is_success) {
                        setData(json.data.data)
                        setReplys(json.data.data.post_reply)
                    } else {
                        alert(json.message)
                    }
                }
            }
        }
        fetchData()
    },[router.query.id, router])

    useEffect(() =>{
        const id = sessionStorage.getItem('id')
        if (id === data.author){
            setModify(true)
        }
    },[data.author])


    async function onClickVote() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("정말로 추천하시겠습니까?")) {
            const formData = new FormData()
            formData.append('id', router.query.id)
    
            const headers = useFetch.forPostMethodWithJWT(formData)
    
            const res = await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/post/vote/', headers)
            const json = await res.json()
    
            if(res.status === 401){
                alert('로그인 유지 시간이 초과되었습니다.')
                router.reload()
            } else if(res.status === 200) {
                if (json.is_success) {
                    alert('성공했습니다.')
                } else {
                    alert('실패했습니다.')
                }
            }

        }
    }

    async function onClickReply() {
        if(reply !== ''){
            // eslint-disable-next-line no-restricted-globals
            if(confirm("답변을 작성하시겠습니까?")) {
                const formData = new FormData()
                formData.append('id', router.query.id)
                formData.append('content', reply)
        
                const headers = useFetch.forPostMethodWithJWT(formData)
        
                const res = await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/reply/', headers)
                const json = await res.json()

                if(res.status === 401){
                    alert('로그인 유지 시간이 초과되었습니다.')
                    router.reload()
                } else if(res.status === 200) {
                    if (json.is_success) {
                        router.reload()
                    } else {
                        alert('실패했습니다.')
                    }
                }


            }
        } else {
            alert('댓글 내용을 작성해주세요.')
        }

    }

    const setOnChange = (event) => {
        const {
          currentTarget: { value, id },
        } = event
    
        switch (id) {
          case 'reply':
            setReply(value)
            break
          default:
            break
        }
    }

    return (
        <Layout>
            <div className="flex items-center justify-center bg-white border-t-4 border-green-500">
                <div className="border-collapse border border-green-400 w-3/4 mt-10 shadow-md">
                    <div className='pl-8 py-5  font-bold text-2xl border-b-2 border-green-100'>{data.subject}</div>
                    <div className='pl-8 py-5 border-b-2 border-green-100 whitespace-pre-wrap'>{data.content}</div>
                    <div className='flex pl-5 py-2 justify-end'>
                        <div className='m-2 p-2 border border-red-100 text-xs min-w-[90px]'>
                            <p>작성자 : </p>
                            <p>{data.author}</p>
                        </div>
                        <div className='m-2 p-2 border border-red-100 text-xs'>
                            <p>수정일 : </p>
                            <p>{moment(data.modify_date).format("YYYY년 MM월 DD일 hh:mm a")}</p>
                        </div>
                        <div className='m-2 p-2 border border-red-100 text-xs'>
                            <p>등록일 : </p>
                            <p>{moment(data.create_date).format("YYYY년 MM월 DD일 hh:mm a")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='w-3/4 my-5'>
                    <Link href="/boards/" className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">리스트</Link>
                    { modify && <Link href={"/boards/post/?id=" + router.query.id} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">수정</Link> }
                    <button onClick={onClickVote} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">추천</button>
                </div>
            </div>
            { replys.length > 0 &&
            <div className="flex items-center justify-center mb-2">
                <div className="border-collapse border border-green-400 w-3/4 shadow-md p-2">
                    {replys.map((item, index) => {
                        return (
                            <div key={index} className='text-xs border-b-2 border-green-100'>
                                <div className='mb-2'>답변 : </div>
                                <div className="flex mb-2">
                                    <div className='w-5/6'>{item.content}</div>
                                    <div>작성자 : {item.writer}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            }
            <div className="flex items-center justify-center">
                <div className="border-collapse border border-green-400 w-3/4 shadow-md p-2">
                    <div className='mb-2'>내용 : </div>
                    <div className="flex items-center justify-center mb-2">
                        <textarea id="reply" onChange={setOnChange} className='w-full border-2 border-green-100'></textarea>
                    </div>
                    <button onClick={onClickReply} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">댓글 작성</button>
                </div>
            </div>
        </Layout>

      )
}

export default PostDetail