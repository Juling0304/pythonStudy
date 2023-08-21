import { useState, useEffect } from 'react'
import * as useFetch from '../../lib/useFetch'
import Layout from '../../components/Layout/Layout'
import { useRouter } from 'next/router'

function PdappIndex() {
    const router = useRouter()

    const [ exadd, setExadd ] = useState([])
    const [ resadd, setResadd ] = useState([])
    const [ reqadd, setReqadd ] = useState([])
    const [ textadd, setTextadd ] = useState([])
    const [ mounted, setMounted ] = useState(false);

    const onClickBtn = (event) => {
        const {
          currentTarget: { value, id },
        } = event

        requestPandas(id)

    }

    async function requestPandas(method) {
        const formData = new FormData()
        formData.append('text', textadd)
        const headers = useFetch.forPostMethodWithJWT(formData)
        let url = ""

        if(method === 'add'){
            url = process.env.NEXT_PUBLIC_BASE_URL + 'pdapp/test/'
        }

        const res =  await useFetch.asyncFetchData(url, headers)
        const json = await res.json()

        if(res.status === 401){
            alert('로그인 유지 시간이 초과되었습니다.')
            router.reload()
        }
        if(method === 'add'){
            let resAdd = []
            resAdd[0] = []
            resAdd[1] = []
            resAdd[2] = []

            resAdd[0].push(json['col1']['0'])
            resAdd[0].push(json['col2']['0'])
            resAdd[0].push(json['col3']['0'])
            resAdd[1].push(json['col1']['1'])
            resAdd[1].push(json['col2']['1'])
            resAdd[1].push(json['col3']['1'])
            resAdd[2].push(json['col1']['2'])
            resAdd[2].push(json['col2']['2'])
            resAdd[2].push(json['col3']['2'])

            setResadd(resAdd)
        }
   
    }

    const setOnChange = (event) => {
        const {
          currentTarget: { value, id },
        } = event
    
        switch (id) {
          case 'textadd':
            setTextadd(value)
            break
          default:
            break
        }
    }

    useEffect(() => {
        setMounted(true);
        setExadd([[1,10,100],[2,20,200],[3,30,300]]);
        setTextadd('{\n"row1": "1,2,3"\n}')
        console.log(typeof textadd)

        console.log(textadd)
    }, [])

    return ( mounted &&
        <Layout>
            <div className="flex items-center justify-center bg-white border-t-4 border-blue-500">
                <div className="table border-collapse border border-blue-400 w-5/6 mt-10 shadow-md">
                    <div className='m-5'>
                        <div>Pandas add :</div>
                        <div className='my-5 flex items-center'>
                            <table className='mx-2'>
                                
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>col1</td>
                                        <td>col2</td>
                                        <td>col3</td>
                                    </tr>
                                    {exadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>row{index + 1}</td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            { textadd.length > 0 &&
                            <table className='mx-2'>
                                
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>col1</td>
                                        <td>col2</td>
                                        <td>col3</td>
                                    </tr>
                                    {resadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>row{index + 1}</td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                            { resadd.length > 0 &&
                            <table className='mx-2'>
                                
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>col1</td>
                                        <td>col2</td>
                                        <td>col3</td>
                                    </tr>
                                    {resadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>row{index + 1}</td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                        </div>
                        <div>
                            <textarea id="textadd" className='border border-2 border-blue-200 w-5/6 whitespace-pre-wrap h-[100px]' onChange={setOnChange} value={textadd}>
                            </textarea>
                            <button id="add" onClick={onClickBtn} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">요청</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </Layout>
    )
}

export default PdappIndex