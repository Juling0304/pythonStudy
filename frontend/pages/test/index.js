import React, { useState, useEffect } from 'react'
import * as useFetch from '../lib/useFetch'


// config.js
export const BACKEND_URL = 'http://127.0.0.1:8000/'

const Home = () => {
  // State to store the data fetched from the backend
  const [data, setData] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await useFetch.asyncFetchData(`http://127.0.0.1:8000/api/hello`,useFetch.forGetMethod())
      const result = await response.json()
      console.log(result)
      setData(result.message)
    }
    fetchData()
  }, [])

  // Render the component JSX
  return (
    <div>
      <h1>Welcome to Test</h1>
      <p>{data}</p>
    </div>
  )
}

export default Home