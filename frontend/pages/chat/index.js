import Layout from '../../components/Layout/Layout'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { useState, useEffect } from 'react'


function ChatIndex() {
    const [client, setClient] = useState(null)
    const [selected, setSelected] = useState(false)
    const [sender, setSender] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([{text: '444', sender: '테스트'},{text: '555', sender: '테스트'}])
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        if(selected){
            console.log('selected')

            client.onopen = () => {
                console.log("WebSocket Client Connected");
            }
    
            client.onmessage = (serverMessage) => {
                let dataFromServer = JSON.parse(serverMessage.data)

                console.log(typeof messages)

                if (dataFromServer) {
                    let tmp = [
                        ...messages,
                        dataFromServer
                    ]
                    setMessages(tmp)
                    console.log(messages)

                //     this.setState((state) => ({
                //     messages: [
                //         ...state.messages,
                //         {
                //         msg: dataFromServer.text,
                //         name: dataFromServer.sender,
                //         },
                //     ],
                //     }))
                }
            }
        }

        setSender(sessionStorage.getItem('name'))
    }, [client,])

    const onClickConnect = () => {
        setSelected(true)
        const c = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + room + "/")
        setClient(c)
    }

    const onClickSend = () => {
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
                <div>
                    Room Name: {room}
                    <br />
                    {messages.map((message) => (
                        <>
                            {message.text} // {message.sender} <br />
                        </>
                    ))}

                    <input type="text" required 
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />
                    <button onClick={onClickSend}>전송</button>

                </div>
                ) : (
                <div>
                    <div >
                        <input type="text" required 
                        label="Room name"
                        name="Room name"
                        value={room}
                        onChange={(e) => {
                            setRoom(e.target.value)
                        }}
                        />
                        <button onClick={onClickConnect}>접속</button>

                    </div>
                </div>
                )}




            </div>
        </Layout>
    )
}

export default ChatIndex