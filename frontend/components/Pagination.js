'use client'
import { useEffect, useState } from 'react'


function Pagination(props) {
    const [arr, setArr] = useState([])

    useEffect(() => {
        let tmp = []
        for(let i = 1; i <= Math.ceil(props.total / props.limit); i++) {
            tmp.push(i)
        }
        setArr(tmp)
    }, [props])

    const setOnClick = (event) => {
        const {
          currentTarget: { value, id },
        } = event
    
        if(id === 'prev'){
            if(props.page !== 1){
                props.setPage(props.page - 1)
            }
        } else if(id === 'next'){
            if(props.page !== Math.ceil(props.total / props.limit)){
                props.setPage(props.page + 1)
            }
        } else {
            props.setPage((value * 1))
        }

    }

    return (
        <div className='mt-5 flex items-center justify-center'>
            <button onClick={setOnClick} id="prev" className='mx-2'>{'<'}</button>
            {arr.map((item, index) => {
                return (
                    <button onClick={setOnClick} className='mx-2' value={item} key={item}>{item}</button>
                )
            })}
            <button onClick={setOnClick} id="next" className='mx-2'>{'>'}</button>
        </div>
    )
}

export default Pagination