import React, { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as useFetch from '../lib/useFetch'

function IndexPage() {
  const router = useRouter()

  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const setOnChange = (event) => {
    const {
      currentTarget: { value, id },
    } = event

    switch (id) {
      case 'id':
        setId(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
  }

  async function onClickLogin() {
    if (id !== '' && password !== '') {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('password', password)
      const headers = useFetch.forPostMethod(formData)

      const res = await useFetch.asyncFetchData('http://127.0.0.1:8000/common/user_login/', headers)
      const json = await res.json()

      if (json.is_success) {
        console.log(json.data)
        sessionStorage.setItem('access', json.data.access)
        sessionStorage.setItem('refresh', json.data.refresh)
        sessionStorage.setItem('id', json.data.id)
        sessionStorage.setItem('name', json.data.name)

        router.push('/main')
      } else {
        console.log('login fail')
      }

    } else {
      alert('ID와 Password 모두 입력해주세요.')
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white border-t-4 border-green-600 rounded-md shadow-md border-top lg:max-w-md">
        <h1 className="text-3xl font-semibold text-center text-green-700">Login</h1>
        <div className="mt-6">
          <div>
            <label className="block text-sm text-gray-800">ID</label>
            <input
              id="id"
              type="text"
              className='block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'
              onChange={setOnChange}
              value={id}
              placeholder="ID를 입력하세요."
            />
          </div>
          <div className="mt-4">
            <div>
              <label className="block text-sm text-gray-800">Password</label>
              <input
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={setOnChange}
                value={password}
                placeholder="Password를 입력하세요."
              />
            </div>
            {/* <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a> */}
            <div className="mt-6">
              <button
                onClick={onClickLogin}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Login
              </button>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account?
          <Link className="font-medium text-green-600 hover:underline" href="/join">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}

export default IndexPage