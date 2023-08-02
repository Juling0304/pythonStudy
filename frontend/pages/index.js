import React, { useState, useEffect } from 'react'
import GetNumber from '../components/getNumber'

function IndexPage() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count]) // 'count' 값이 변경될 때마다 이 효과가 실행됩니다

  function handleClick(event) {
    console.log('Button clicked')
    console.log(event.target.value)
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={handleClick} value="test1" data-uri="localhost:8000">Test 버튼</button>
      <GetNumber count={count} />
    </div>
  )
}

export default IndexPage