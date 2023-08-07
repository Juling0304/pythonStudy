import React from 'react'
import { useRouter } from 'next/router'

function testPage(){
    const router = useRouter()
    const id = router.query.id || ["LOADING"]
    console.log('here')
    console.log(id)

    return (
        <div>
            {router.query.id} 페이지 입니다.
        </div>
      )
}

export default testPage