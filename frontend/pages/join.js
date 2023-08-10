import React, { useState, useEffect, lazy, Suspense } from 'react'
import * as useFetch from '../lib/useFetch'
import { useRouter } from 'next/router'
import JoinError from '../components/joinError'


function JoinPage() {

    const router = useRouter();

    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("com928@naver.com")
    const [error, setError] = useState(null)

    const setOnChange = (event) => {
        const {
            currentTarget: { value, id },
        } = event

        switch (id) {
            case 'name':
                setName(value)
                break
            case 'id':
                setId(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'email':
                setEmail(value)
                break
            default:
                break
        }
    }

    async function onClickJoin() {
        if (id !== '' && password !== '' && name !== '' && email !== '') {
            const formdata = new FormData()
            formdata.append('name', name)
            formdata.append('id', id)
            formdata.append('password', password)
            formdata.append('email', email)

            const headers = useFetch.forPostMethod(formdata)
            const res = await useFetch.asyncFetchData('http://127.0.0.1:8000/common/user_join/', headers)
            const json = await res.json()
            
            if (json.is_success) {
                router.push('/')
            } else {
                setError(json.message)
            }
        } else {
            alert('내용을 모두 입력해주세요.')
        }
    }

    return (
        <div>
            <div>
                <p>Join page</p>
                <JoinError error={error} />
                <p>
                    name :
                    <input
                        id="name"
                        type="text"
                        onChange={setOnChange}
                        value={name}
                        placeholder="NAME를 입력하세요."
                    />
                </p>
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
                <p>
                    E-mail :
                    <input
                        id="email"
                        type="email"
                        onChange={setOnChange}
                        value={email}
                        placeholder="email 입력하세요."
                    />
                </p>
                <button onClick={onClickJoin}>회원가입</button>
            </div>
        </div>
    )
}

export default JoinPage