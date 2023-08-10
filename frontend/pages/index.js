import React, { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import * as useFetch from '../lib/useFetch'

function IndexPage() {
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
      formData.append('id',id)
      formData.append('password',password)
      const headers = useFetch.forPostMethod(formData)

      const res =  await useFetch.asyncFetchData('http://127.0.0.1:8000/common/user_login/', headers)
      const json = await res.json()
      console.log(json)

    } else {
      alert('ID와 Password 모두 입력해주세요.')
    }
  }

  return (
    <div>
      <div>
        Login page
      </div>
      <div>
        <p>
          id :
          <input
            id="id"
            type="text"
            onChange={setOnChange}
            value={id}
            placeholder="ID를 입력하세요."
          />
        </p>
        <p>
          password :
          <input
            id="password"
            type="password"
            onChange={setOnChange}
            value={password}
            placeholder="Password를 입력하세요."
          />
        </p>
        <button onClick={onClickLogin}>로그인</button>
      </div>
      <br />
      <div>
        <Link href="/join">
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  )
}

export default IndexPage