import React, { useEffect, useState } from 'react'
import api from '../api'

const Home = () => {
    
    const [chats, setChats] = useState([])

    useEffect(function(){
        api.get('/api/chat/rooms')
        .then(res => {
            setChats(res.data)
            console.log(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    })

    return (
        <div>
            {chats.map((chat) => {
                // <button><a href={`/room/${chat.id}`}>{chat.name}</a></button>
                {chat.name}
            })}
            
        </div>
    )
}

export default Home