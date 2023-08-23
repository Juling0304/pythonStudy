import { useState, useEffect } from 'react'
import * as useFetch from '../../lib/useFetch'
import { useRouter } from 'next/router'

function Basic(props) {
    const router = useRouter()

    const [ exadd, setExadd ] = useState([])
    const [ resadd, setResadd ] = useState([])
    const [ reqadd, setReqadd ] = useState([])
    const [ textadd, setTextadd ] = useState([])

    const [ exsub, setExsub ] = useState([])
    const [ ressub, setRessub ] = useState([])
    const [ reqsub, setReqsub ] = useState([])
    const [ textsub, setTextsub ] = useState([])

    const [ exdot, setExdot ] = useState([])
    const [ resdot, setResdot ] = useState([])
    const [ reqdot, setReqdot ] = useState([])
    const [ textdot, setTextdot ] = useState([])
    
    const [ mounted, setMounted ] = useState(false);

    const onClickBtn = (event) => {
        const {
          currentTarget: { value, id },
        } = event

        requestPandas(id)

    }

    async function requestPandas(method) {
        const formData = new FormData()

        if(method === 'add'){
            formData.append('ex', JSON.stringify(exadd))
            formData.append('text', textadd)
        } else if (method === 'sub'){
            formData.append('ex', JSON.stringify(exsub))
            formData.append('text', textsub)
        } else if (method === 'dot'){
            formData.append('ex', JSON.stringify(exdot))
            formData.append('text', textdot)
        }
        
        formData.append('mode', method)
        const headers = useFetch.forPostMethodWithJWT(formData)

        let url = process.env.NEXT_PUBLIC_BASE_URL + "pdapp/basic/"

        const res =  await useFetch.asyncFetchData(url, headers)
        const json = await res.json()

        if(res.status === 401){
            alert('로그인 유지 시간이 초과되었습니다.')
            router.reload()
        }
        if(json.is_success === true){
            if(method === 'add'){
                setResadd(makeArray(json.res))
                setReqadd(makeArray(json.req))
            } else if (method === 'sub'){
                setRessub(makeArray(json.res))
                setReqsub(makeArray(json.req))
            } else if (method === 'dot'){
                setResdot(makeArray(json.res))
                setReqdot(makeArray(json.req))
            }
        } else {
            alert(json.message)
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
        case 'textsub':
            setTextsub(value)
            break
        case 'textdot':
            setTextdot(value)
            break
          default:
            break
        }
    }

    function makeArray(object){
        console.log(object)
        let array = []
        for(let i =0; i < object['0'].length; i++){
            array[i] = []
        }

        for(let x = 0; x < Object.keys(object).length; x++){
            for(let y = 0; y < array.length; y++){
                array[y].push(object[x][y])
            }
        }

        return array
    }

    useEffect(() => {
        setMounted(true);
        // 기본 값
        setExadd([[1,10,100],[2,20,200],[3,30,300]]);
        setExsub([[1,10,100],[2,20,200],[3,30,300]]);
        setExdot([[1,10,100],[2,20,200],[3,30,300]]);

        setTextadd('[\n\t[1,2,3],\n\t[10,20,30]\n]')
        setTextsub('[\n\t[1,2,3],\n\t[10,20,30]\n]')
        setTextdot('[\n\t[1,1,1],\n\t[1,1,1],\n\t[1,1,1]\n]')
    }, [])

    return (mounted &&
            <>
                <div className="table border-collapse border border-blue-400 w-5/6 mx-auto mt-10 shadow-md">
                    <div className='m-5'>
                        <div>Pandas add :</div>
                        <div className='my-5 flex items-start'>
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            기본 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {exadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            { reqadd.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            요청 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {reqadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                            { resadd.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            결과 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {resadd.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                        </div>
                        <div>
                            <textarea id="textadd" className='border border-2 border-blue-200 w-5/6 whitespace-pre-wrap h-[120px]' onChange={setOnChange} value={textadd}>
                            </textarea>
                            <button id="add" onClick={onClickBtn} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">요청</button>
                        </div>
                    </div>
                </div>
                <div className="table border-collapse border border-blue-400 w-5/6 mx-auto mt-10 shadow-md">
                    <div className='m-5'>
                        <div>Pandas sub :</div>
                        <div className='my-5 flex items-start'>
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            기본 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {exsub.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            { reqsub.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            요청 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {reqsub.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                            { ressub.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            결과 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {ressub.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                        </div>
                        <div>
                            <textarea id="textsub" className='border border-2 border-blue-200 w-5/6 whitespace-pre-wrap h-[120px]' onChange={setOnChange} value={textsub}>
                            </textarea>
                            <button id="sub" onClick={onClickBtn} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">요청</button>
                        </div>
                    </div>
                </div>
                <div className="table border-collapse border border-blue-400 w-5/6 mx-auto mt-10 shadow-md">
                    <div className='m-5'>
                        <div>Pandas dot(행렬 곱) :</div>
                        <div className='my-5 flex items-start'>
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            기본 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {exdot.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            { reqdot.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            요청 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {reqdot.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                            { resdot.length > 0 &&
                            <table className='mx-2 border border-blue-400'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>
                                            결과 값
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td className='p-2'>col1</td>
                                        <td className='p-2'>col2</td>
                                        <td className='p-2'>col3</td>
                                    </tr>
                                    {resdot.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-2'>row{index + 1}</td>
                                                <td className='p-2'>{item[0]}</td>
                                                <td className='p-2'>{item[1]}</td>
                                                <td className='p-2'>{item[2]}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            }
                        </div>
                        <div>
                            <textarea id="textdot" className='border border-2 border-blue-200 w-5/6 whitespace-pre-wrap h-[120px]' onChange={setOnChange} value={textdot}>
                            </textarea>
                            <button id="dot" onClick={onClickBtn} className="mx-1 py-2 px-3 bg-red-200 hover:bg-red-400 text-black-900 hover:text-black-800 rounded transition duration-300">요청</button>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Basic