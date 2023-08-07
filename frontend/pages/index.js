import React, { useState, useEffect, lazy, Suspense } from 'react'
import Counter from '../components/index/counter'

// import GetNumber from '../components/getNumber'
// const GetNumber = React.lazy(() => import('../components/getNumber'))
const GetNumber = lazy(() => import('../components/getNumber'))

function IndexPage() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    document.title = `You clicked ${count} times`
    printLog()
  }, [count]) // 'count' 값이 변경될 때마다 이 효과가 실행됩니다

  function handleClick(event) {
    console.log('Button clicked')
    console.log(event.target.value)
  }

  function printLog() {
    console.log('1231231313')
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={handleClick} value="test1" data-uri="localhost:8000">Test 버튼</button>
      <Suspense fallback={<div>Loading...</div>}>
        <GetNumber count={count} />
      </Suspense>
      <Counter count={count} setCount={setCount}/>

    </div>
  )
}

export default IndexPage