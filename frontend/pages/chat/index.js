import Layout from '../../components/Layout/Layout'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useState, useEffect } from 'react'


function ChatIndex() {
    const [client, setClient] = useState(null)
    const [selected, setSelected] = useState(false)
    const [sender, setSender] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([{text: '채팅이 시작됐습니다.'}, {text: '내용은 실시간 데이터만 확인이 가능합니다.'}])
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        if(selected){
            client.onopen = () => {
                console.log("WebSocket Client Connected");
            }
            client.onmessage = (serverMessage) => {
                let dataFromServer = JSON.parse(serverMessage.data)

                if (dataFromServer) {
                    // 비동기식 처리를 할 경우 가장 마지막에 처리한 state 값만 적용됨
                    // 아래 방식이 동기식 처리
                    setMessages((prevState) => { return [
                        ...prevState,
                        dataFromServer
                    ] })
                }
            }
        }

        setSender(sessionStorage.getItem('name'))
    }, [client,])

    const onClickConnect = () => {
        if(room === ''){
            alert('방 번호를 입력해주세요.')
            return false
        }
        setSelected(true)
        const c = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + room + "/")
        setClient(c)
    }

    const onClickSend = () => {
        if(message === ''){
            alert('메세지를 입력해주세요.')
            return false
        }
        client.send(
            JSON.stringify({
              type: "message",
              text: message,
              sender: sender,
            })
          )
          setMessage('')
    }

    return (
        <Layout>
            <div className="bg-white border-t-4 border-yellow-500">
                {selected ? (
                <div className='table border-collapse border border-yellow-400 w-5/6 mx-auto mt-10 shadow-md'>
                    <div className='relative flex flex-col justify-center p-5'>
                        <span className='font-bold border-b-2 border-yellow-100 hover:bg-yellow-100 mb-5 pb-2'>방 번호: {room}</span>
                        {messages.map((message) => (
                            <div key={message.text} className='relative flex item-start p-1'>
                                <div className='w-[90%]'>{message.text}</div>
                                <div className='w-[10%] text-center border-l-2'>{message.sender}</div>
                            </div>
                        ))}
                        <div className='mt-3'>
                            <input type="text" required 
                                value={message}
                                className='w-[95%] px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                onChange={(e) => {
                                    setMessage(e.target.value)
                                }}
                            />
                            <button className='w-[5%]' onClick={onClickSend}>전송</button>
                        </div>

                    </div>
                </div>
                ) : (
                <div className='table border-collapse border border-yellow-400 w-2/6 mx-auto mt-10 shadow-md'>
                    <div className='relative flex flex-col justify-center items-center p-10'>
                        <div className=''>
                            <span className='font-bold'>방 번호 :</span>
                            <input type="text" required 
                            label="Room name"
                            name="Room name"
                            value={room}
                            className='block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            onChange={(e) => {
                                setRoom(e.target.value)
                            }}
                            />
                        </div>
                        <div className='mt-5'>
                            <button className='px-3 py-2 bg-yellow-200 hover:bg-yellow-400 text-black-900 hover:text-black-800 rounded transition duration-300' onClick={onClickConnect}>접속</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </Layout>
    )
}

export default ChatIndex