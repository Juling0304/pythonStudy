'use client'

import React from "react"

function Counter(props) {

  return (
    <div>
      <p>You clicked {props.count} times</p>
      <button onClick={() => props.setCount(props.count + 1)}>Increment</button>
      <button onClick={() => props.setCount(props.count - 1)}>Decrement</button>
    </div>
  )
}

export default Counter