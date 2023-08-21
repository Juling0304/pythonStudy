import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout/Layout'
import * as useFetch from '../../../lib/useFetch'
import Link from 'next/link'

function Post() {
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [mode, setMode] = useState(null)

    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            if (router.query.id !== undefined) {
                const headers = useFetch.forGetMethodWithJWT()
                setMode('modify')
                const res =  await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/post/?mode=' + mode + '&id=' + router.query.id, headers)
    
                if(res.status === 401){
                    alert('로그인 유지 시간이 초과되었습니다.')
                    router.reload()
                } else if(res.status === 200) {
                    const json = await res.json()
                    if(json.is_success) {
                        setSubject(json.data.data.subject)
                        setContent(json.data.data.content)
                    } else {
                        alert(json.message)
                        router.push('/boards/')
                    }
                }
            }
        }
        fetchData()
    },[router.query.id, router, mode])

    const setOnChange = (event) => {
        const {
          currentTarget: { value, id },
        } = event
    
        switch (id) {
          case 'subject':
            setSubject(value)
            break
          case 'content':
            setContent(value)
            break
          default:
            break
        }
    }

    async function onClickWrite() {
        if (subject !== '' && content !== '') {
            const formData = new FormData()
            formData.append('id', router.query.id)
            formData.append('subject', subject)
            formData.append('content', content)

            let headers = ''

            if(mode == null){
                headers = useFetch.forPostMethodWithJWT(formData)
            } else if(mode === 'modify') {
                headers = useFetch.forPutMethodWithJWT(formData)
            }


            const res = await useFetch.asyncFetchData(process.env.NEXT_PUBLIC_BASE_URL + 'boards/post/', headers)
            const json = await res.json()

            if(res.status === 401){
                alert('로그인 유지 시간이 초과되었습니다.')
                router.reload()
            } else {
                if(json.is_success){
                    router.push('/boards/')
                } else {
                    alert('작성에 실패했습니다.')
                }
            }

        } else {
            alert('글 정보를 입력해주세요.')
        }
    }

    return (
        <Layout>
            <div className="flex items-center justify-center bg-white border-t-4 border-green-500">
                <div className='w-3/4 mt-10 p-6 bg-green-100 rounded-md drop-shadow-md'>
                    <div className='p-6 bg-white rounded-md '>
                        <div className='my-5'>
                            <span className='font-bold text-2xl'>글 제목 : </span>
                            <input 
                                id="subject"
                                type="text"
                                className='w-full mt-2 text-2xl p-2 border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                placeholder="제목을 입력하세요."
                                onChange={setOnChange}
                                value={subject}>
                            </input>
                        </div>
                        <div className='my-5'>
                            <span className='font-bold text-2xl'>내용 : </span>
                            <textarea 
                                id="content"
                                className='w-full mt-2 p-2 min-h-[150px] border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                placeholder="내용을 입력하세요."
                                onChange={setOnChange}
                                value={content}>
                            </textarea>
                        </div>
                        <button
                            onClick={onClickWrite}
                            className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">
                            작성
                        </button>
                        <Link 
                            href="/boards/"
                            className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">
                                리스트
                        </Link>

                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Post