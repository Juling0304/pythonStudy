import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout/Layout'
import * as useFetch from '../../../lib/useFetch'

function BoardsIndex() {
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")

    const router = useRouter()

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
            formData.append('subject', subject)
            formData.append('content', content)
            const headers = useFetch.forPostMethodWithJWT(formData)

            const res = await useFetch.asyncFetchData('http://127.0.0.1:8000/boards/write_post/', headers)
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
            <div className="flex items-center justify-center min-h-screen bg-white border-t-4 border-green-600">
                <div className='w-3/4 p-6 bg-green-100 rounded-md drop-shadow-md'>
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
                            className="w-[120px] h-[45px] py-2 px-3 bg-red-300 hover:bg-red-500 text-black-900 hover:text-black-800 rounded transition duration-300">
                            작성
                        </button>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default BoardsIndex